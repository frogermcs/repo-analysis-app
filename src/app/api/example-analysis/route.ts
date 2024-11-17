import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not defined");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = await prisma.prompt.findUnique({
        where: { id: "a093e184-5819-4887-b25d-6bfa00de5c86" },
      }).then((prompt) => prompt?.text);
    const repoPrompt = await prisma.repository.findUnique({
        where: { id: "ae5ea965-db92-453e-8711-338bdb65744b" },
      }).then((repo) => repo?.text);
    const architecturePrompt = "I want suggestions for layered architecture";
    
    if (!prompt || !repoPrompt) {
        throw new Error("Prompt or Repository not found");
    }

    const result = await model.generateContent([prompt, architecturePrompt, repoPrompt]);
    console.log(result.response.text());
    return NextResponse.json({ text: result.response.text() });
  } catch (error) {
    console.error('Gemini Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });    
  }
}