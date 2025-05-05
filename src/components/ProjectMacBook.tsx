"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
// Import types from three.js for GLTFLoader
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ProjectMacBookProps {
  imageUrl: string;
  onClick?: () => void;
}

// MacBook 3D model component
function MacBookModel({ imageUrl }: { imageUrl: string }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene: threeScene } = useThree();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);

    // Dynamically import loaders to avoid TypeScript errors
    const loadModel = async () => {
      // Dynamic imports to avoid TypeScript errors
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      const { DRACOLoader } = await import(
        "three/examples/jsm/loaders/DRACOLoader.js"
      );

      // Instantiate a loader
      const loader = new GLTFLoader();

      // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      loader.setDRACOLoader(dracoLoader);

      // Load the glTF resource
      loader.load(
        // resource URL
        "/3DModels/macbook.gltf",
        // called when the resource is loaded
        function (gltf: GLTF) {
          // Create a group to hold the model
          const model = new THREE.Group();
          model.add(gltf.scene);

          // Apply the texture to the screen mesh
          gltf.scene.traverse((child: THREE.Object3D) => {
            if (
              child instanceof THREE.Mesh &&
              (child.name.includes("screen") || child.name.includes("Screen"))
            ) {
              // Apply the project screenshot as a texture to the screen
              const screenMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                emissive: new THREE.Color(0xffffff),
                emissiveMap: texture,
                emissiveIntensity: 0.8,
              });
              child.material = screenMaterial;
            }
          });

          // Initial position and scale
          model.scale.set(0.7, 0.7, 0.7);
          model.position.set(0, -0.8, 0);
          model.rotation.y = Math.PI * 0.05;

          // Set the ref to access in the animation loop
          if (modelRef.current) {
            // Clear previous model if any
            while (modelRef.current.children.length > 0) {
              modelRef.current.remove(modelRef.current.children[0]);
            }
            // Add the new model
            modelRef.current.add(model);
          } else {
            // Add model directly to the scene if ref not available
            threeScene.add(model);
          }

          setModelLoaded(true);
        },
        // called while loading is progressing
        function (xhr: { loaded: number; total: number }) {
          const progress = (xhr.loaded / xhr.total) * 100;
          setLoadingProgress(progress);
          console.log(progress + "% loaded");
        },
        // called when loading has errors
        function (err: unknown) {
          console.error("An error happened during model loading:", err);
        }
      );
    };

    loadModel();

    // Cleanup function - Save a reference to the current modelRef value
    const currentModelRef = modelRef.current;
    return () => {
      if (currentModelRef) {
        while (currentModelRef.children.length > 0) {
          currentModelRef.remove(currentModelRef.children[0]);
        }
      }
    };
  }, [imageUrl, threeScene]);

  // Gentle auto-rotation of the model
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15; // Slow rotation speed
    }
  });

  return (
    <>
      {!modelLoaded && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gray" />
          <Html position={[0, 1.5, 0]}>
            <div
              style={{
                color: "white",
                background: "rgba(0,0,0,0.7)",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              Loading: {loadingProgress.toFixed(0)}%
            </div>
          </Html>
        </mesh>
      )}
      <group ref={modelRef} />
    </>
  );
}

export default function ProjectMacBook({
  imageUrl,
  onClick,
}: ProjectMacBookProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[280px] w-full bg-gray-800 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="h-[280px] w-full cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={1} />

        <Suspense fallback={null}>
          <MacBookModel imageUrl={imageUrl} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={1.5}
            far={2}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate={!isHovered}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
