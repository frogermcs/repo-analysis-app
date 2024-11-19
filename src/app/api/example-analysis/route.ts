import { LLMService } from "@/services/llm.service";
import { PromptService } from "@/services/prompt.service";
import { RepositoryService } from "@/services/repository.service";
import { NextResponse } from 'next/server'

const llmService = new LLMService()
const repositoryService = new RepositoryService()
const promptService = new PromptService()

export async function GET() {
  try {
    const prompt = await promptService.getPrompt("a093e184-5819-4887-b25d-6bfa00de5c86")
    const architecturePrompt = "I want suggestions for layered architecture";
    const repoPrompt = await repositoryService.getRepository("ae5ea965-db92-453e-8711-338bdb65744b")
    
    if (!prompt || !repoPrompt) {
        throw new Error("Prompt or Repository not found");
    }
    const llmResponse = await llmService.generateAudit([prompt.text, architecturePrompt, repoPrompt.text])
    return NextResponse.json({ text: llmResponse });
  } catch (error) {
    console.error('Gemini Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });    
  }
}