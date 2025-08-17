import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Function to read markdown files and create context
async function getPortfolioContext() {
  const dataDir = path.join(process.cwd(), "data");
  const files = [
    "bio.md", 
    "skills.md", 
    "experience.md", 
    "projects.md",
    "achievements.md",
    "social_links.md",
    "extracurricular_volunteering.md"
  ];
  
  let context = "";
  
  for (const file of files) {
    try {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      context += `\n\n=== ${file.replace('.md', '').toUpperCase().replace('_', ' ')} ===\n${content}`;
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  }
  
  return context;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get portfolio context
    const portfolioContext = await getPortfolioContext();

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create the prompt with context
    const prompt = `You are an AI assistant for Jalina Hirushan's portfolio website. You should help visitors learn about Jalina's background, skills, experience, and projects. 

IMPORTANT: Jalina Hirushan is a male software developer. Use he/him pronouns when referring to Jalina.

Here is the information about Jalina:
${portfolioContext}

Please answer the following question in a helpful, professional, and friendly manner. Keep responses concise but informative. If the question is not related to Jalina's portfolio, politely redirect the conversation back to topics about Jalina's professional background. Remember to use he/him pronouns when referring to Jalina.

Question: ${message}

Answer:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
