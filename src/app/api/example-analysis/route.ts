import { AuditService } from "@/services/audit.service";
import { LLMService } from "@/services/llm.service";
import { PromptService } from "@/services/prompt.service";
import { RepositoryService } from "@/services/repository.service";
import { NextResponse } from 'next/server'

const llmService = new LLMService()
const repositoryService = new RepositoryService()
const promptService = new PromptService()
const auditService = new AuditService()

export async function GET() {
  try {
    const promptId = "a093e184-5819-4887-b25d-6bfa00de5c86"
    const repoId = "ae5ea965-db92-453e-8711-338bdb65744b"
  
    const existingAudit = await auditService.getAuditForRepoAndPrompt(repoId, promptId)
    if (existingAudit) {
      return NextResponse.json({ existingAudit: existingAudit });
    }
  
    const prompt = await promptService.getPrompt(promptId)
    const architecturePrompt = "I want suggestions for layered architecture";
    const repo = await repositoryService.getRepository(repoId)
    
    if (!prompt || !repo) {
        throw new Error("Prompt or Repository not found");
    }
    const llmResponse = await llmService.generateAudit([prompt.text, architecturePrompt, repo.text])
    const auditId = await auditService.createAudit(llmResponse, repo.id, prompt.id)
    const newAudit = await auditService.getAudit(auditId)
    return NextResponse.json({ audit: newAudit });
  } catch (error) {
    console.error('Gemini Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });    
  }
}