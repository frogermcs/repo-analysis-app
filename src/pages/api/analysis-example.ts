import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
        
        
        if (!prompt || !repoPrompt) {
            throw new Error("Prompt or Repository not found");
        }

        const result = await model.generateContent([prompt, repoPrompt]);
        console.log(result.response.text());
      res.status(200).json({ text: result.response.text() });
    } catch (error) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
