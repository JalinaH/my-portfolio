# Projects

## TerraFix – AI-Powered Terraform CI Repair Platform
**Individual Project** | Ascentic AI Launch Pad  
An AI-powered DevOps platform designed to diagnose failed Terraform CI pipelines and generate verified, human-reviewable code repairs. Handles failures whose diagnostics and repairs may span files, dependencies, provider constraints, permissions, credentials, or the execution environment.

- **Tech Stack**: Python, Terraform, Next.js, TypeScript, PostgreSQL, Prisma, GitHub Apps, GitHub Actions, LLM APIs, OpenRouter, Gemini, AWS  
- **Architecture**: Next.js control plane with PostgreSQL for persistent state and job coordination; separate worker for Git and Terraform operations in disposable workspaces  
- **Core Features**:  
  - Collects bounded evidence from the exact failing revision, including diagnostics, relevant code changes, Terraform dependencies, and provider context when required  
  - Uses LLM-based semantic reasoning to identify likely root causes and propose structured source-level edits, bounded to a maximum of two semantic stages  
  - Converts proposed edits into deterministic Git patches with strict path and scope restrictions  
  - Verifies repairs using Terraform fmt, backend-disabled init, validate, and optional refresh-free planning  
  - Requires human approval before repository modification and fresh verification before committing the repair to the PR  
- **Safety Boundaries**: Never executes terraform apply, auto-merges PRs, or force-pushes changes  
- **Objective**: Reduce repetitive Terraform debugging while preserving deterministic verification and developer control  
- **Skills**: Python, Terraform, DevOps, Artificial Intelligence (AI), Large Language Models (LLM), Infrastructure as Code (IaC), CI/CD, Next.js
- **Live Demo**: [TerraFix](https://terrafix-dashboard.vercel.app/)
- **GitHub**: [Agent](https://github.com/JalinaH/semantic-terraform-agent), [Dashboard](https://github.com/JalinaH/semantic-terraform-dashboard)


---

## AutoNova – Automobile Service Management Platform
**Group Project** | Full Stack Developer  
A cloud-native, microservices-based platform designed to streamline vehicle maintenance operations, employee task tracking, and customer appointment scheduling for enterprise-level automobile service centers.

- **Tech Stack**: React.js, Java Spring Boot, C# ASP.NET Core, Entity Framework Core, PostgreSQL, Docker, Docker Compose, JWT, OAuth2, Spring Security, REST APIs  
- **Architecture**: Polyglot microservices with service layer and DTO-based design, Netflix Eureka service discovery, Spring Cloud Gateway API routing, RESTful inter-service communication with data enrichment, and multi-schema PostgreSQL databases  
- **Core Features**:  
  - Employee work hour tracking with automated validation and approval workflows  
  - Project and task lifecycle management with status tracking  
  - Customer vehicle service history and appointment booking  
  - Role-based authentication and authorization using JWT, OAuth2, and Spring Security  
  - Real-time notifications and service progress monitoring  
  - Centralized API gateway and service discovery for inter-service communication  
- **Objective**: Provide a unified, role-based platform for service operations with real-time data synchronization across services  
- **Skills**: React.js, Spring Boot, Docker, Java, Docker Hub, REST APIs, Microservices, PostgreSQL  
- **Role**: Full Stack Developer
- **GitHub**: [Frontend](https://github.com/void-squad/autonova-frontend-v1), [Backend](https://github.com/void-squad/autonova-backend)


---

## Land Asset Valuation System – Mobile GIS Application
**Government Project** | Valuation Department  
A comprehensive mobile-first Land & Asset Valuation System to digitize property assessment workflows. Replaced manual field operations with an integrated GIS-enabled mobile application supporting offline data collection and real-time synchronization.

- **Tech Stack**: Flutter, ASP.NET Core 8.0, PostgreSQL, Mapbox SDK, JWT Authentication  
- **Architecture**: Clean Architecture with BLoC pattern and Riverpod dependency injection  
- **Key Achievements**:  
  - Enhanced field efficiency by 60% through automated data capture and report generation  
  - Improved data accuracy by 80% via real-time validation and GPS-based asset marking  
  - Built robust offline functionality with automatic sync for uninterrupted field operations  
  - Delivered multi-language support (English, Sinhala, Tamil)  
- **Core Features**:  
  - Interactive mapping with polygon drawing and area calculations  
  - Complete asset management for land acquisition and property assessments  
  - Sales and rental evidence collection with image upload  
  - Automated valuation reports and rating card generation  
  - Multi-environment deployment (dev/test/production)  
- **Impact**:  
  - Streamlined operations for District Valuers and assessment teams  
  - Enabled real-time sync between field operations and centralized GIS systems  
  - Improved transparency in land acquisition, taxation, and urban planning  
  - Successfully deployed across government valuation departments  

---

## The Fuzzball Theorem – Exoplanet AI
**Oct 2025** | NASA Space Apps Challenge 2025  
An AI-powered web application that detects exoplanets from TESS (Transiting Exoplanet Survey Satellite) light curve data using machine learning and signal processing techniques.

- **Tech Stack**: Next.js, TypeScript, Tailwind CSS, FastAPI, Python, XGBoost, HuggingFace  
- **Features**:  
  - TIC ID-based and CSV light curve analysis  
  - Real-time transit detection with confidence metrics  
  - Interactive 3D planet visualization  
  - CI/CD pipelines via GitHub Actions  
  - Box Least Squares (BLS) algorithm for feature extraction  
  - XGBoost classification for exoplanet transit signal identification  
- **Deployment**: Frontend on Vercel, Backend on HuggingFace Spaces  
- **Live Demo**: [The Fuzzball Theorem](https://the-fuzzball-theorem-exoplanet-ai-f.vercel.app/)  
- **GitHub**: [Repository](https://github.com/VishwaJaya01/the-fuzzball-theorem-exoplanet-ai)  
- **Role**: Full Stack Developer  

---

## CeylonRides – Vehicle Rental Platform
**Mar 2025 – Apr 2025** | Solo Project  
A complete vehicle rental web application serving Tourists, Drivers, and Administrators.  
- **Tech Stack**: React (Vite, Context API, React Router), Tailwind CSS, React Big Calendar, Node.js, Express.js, MongoDB, JWT, Bcrypt  
- **Features**:  
  - Authentication & role management (Admin, Tourist, Driver)  
  - Custom dashboards for each role  
  - Admin panel for CRUD operations on vehicles & drivers  
  - Booking approval/rejection and driver assignment  
  - Tourist flow: search, filter, view calendars, submit requests, track history  
  - Driver dashboard for assigned trips & status updates  
- **Deployment**: Frontend on Netlify, Backend on Render  
- **Learning**: Strengthened full-stack skills, RESTful API design, authentication/authorization  

---

## CookPal – Recipe Sharing Platform
**May 2024** | Team Project (University of Moratuwa)  
A recipe exploration and management web app built as a first-year assignment.  
- **Team Members**: Rithara Kithmanthie, Akith Chandinu, Vishwa Jayasankha, Saradi  
- **Tech Stack**: React + Vite, Firebase (Auth & Hosting), CSS/Bootstrap  
- **Features**:  
  - User authentication & profile management  
  - Recipe creation with detailed metadata (portion size, cook time, etc.)  
  - Tag-based filtering & search  
- **Deployment**: [CookPal Live](https://cookpal-7029c.web.app/)  

---

## Smart Cricket Trainee – CricBOT (IoT Hardware Project)
**2023 – 2024** | Team Project (University of Moratuwa)  
An automated cricket practice machine for customizable training sessions.  
- **Tech Stack**: Arduino Mega, ESP8266 (NodeMCU), Mobile App (WiFi-controlled)  
- **Features**:  
  - Ball type, count, and delay selection via keypad + LCD  
  - Safety & error detection with buzzer/LED alerts  
  - Mobile app control via WiFi APIs  
  - Ball types: Fast, Bouncer, Slow, In-Swing, Out-Swing  
- **Hardware Components**: DC Motors, Motor Drivers, Servo Motors, Proximity Sensor, Load Cell + HX711, LCD, Keypad, Ultrasonic Sensor  
- **Role**: System Architect & Developer  

---

## CricBOT Mobile App
**May 2024 – Jul 2024** | Solo Developer  
A mobile app for controlling the CricBOT machine and viewing player stats.  
- **Tech Stack**: React Native (Expo), NativeWind (Tailwind), Firebase (Auth + Firestore), Arduino ESP8266  
- **Features**:  
  - Authentication & landing page flow  
  - Home page for ball type selection & machine status  
  - Session page for configuring speed, delay, and ball count  
  - Stats page with charts (daily, weekly, monthly progress)  
  - Profile management & logout  

---

## DebateX – Debate Platform
**May 2024 – Sep 2024** | Team Project  
An advanced online debate platform designed for structured competitions.  
- **Tech Stack**: Next.js, Tailwind CSS, Framer Motion, Firebase, Clerk (Auth), Stream.io SDK, Radix UI  
- **Features**:  
  - Automated time management & fair coin toss  
  - Role-based views for judges, debaters, organizers  
  - Real-time chat (private & group)  
  - Recording & session review  
  - Integrated note-taking system  

---

## Pay Sheet Emailer
**Dec 2024 – Mar 2025** | University Project  
A real-world desktop application built for the Finance Division of the University of Moratuwa.  
- **Tech Stack**: Python, CustomTkinter, SQLite  
- **Features**:  
  - Automated email distribution of monthly paysheets  
  - Role-based authentication (admin & user)  
  - Real-time delivery status updates  
  - Centralized settings management  
  - Modular, scalable architecture  
- **Impact**: Streamlined paysheet distribution for all university employees  

---

## Sample User Management System
**May 2024** | Solo Developer  
A robust CRUD application for managing users, built with the MERN stack.  
- **Tech Stack**: MongoDB, Express.js, React.js, Node.js  
- **Features**:  
  - User dashboard with edit & delete functionality  
  - Registration & update forms  
  - Dynamic user table with confirmation prompts  
- **Deployment**: Live demo available  
- **Role**: Full-Stack Developer  

---

## Portfolio Website
**May 2025** | Solo Developer  
This personal portfolio site designed for professional branding and projects showcase.  
- **Tech Stack**: Next.js, TypeScript, Tailwind CSS, Framer Motion  
- **Features**:  
  - Skills, projects, blogs, and education sections  
  - Animated transitions & smooth UI/UX  
  - Mobile-first responsive design  
- **Role**: Solo Developer  
