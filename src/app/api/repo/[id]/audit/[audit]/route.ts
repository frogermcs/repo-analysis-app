import { AuditService } from '@/services/audit.service';
import { LLMService } from '@/services/llm.service';
import { PromptService } from '@/services/prompt.service';
import { RepositoryService } from '@/services/repository.service';
import { NextResponse, NextRequest } from 'next/server'

const repositoryService = new RepositoryService()
const auditService = new AuditService()
const promptSerivce = new PromptService()
const llmService = new LLMService()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, audit: string }> }
) {
  try {
    const repoId = (await params).id;
    const promptId = (await params).audit;

    const repo = await repositoryService.getRepository(repoId)
    const prompt = await promptSerivce.getPrompt(promptId)

    if (!prompt || !repo) {
      throw new Error("Prompt or Repository not found");
  }

    const existingAudit = await auditService.getAuditForRepoAndPrompt(repoId, promptId)
    if (existingAudit) {
      return NextResponse.json({ audit: existingAudit });
    }
    
    // const architecturePrompt = "I want suggestions for layered architecture";
    const llmInput = [
      prompt.text, 
      // architecturePrompt, 
      repo.text
    ]
    
    const llmResponse = await llmService.generateAudit(llmInput)
    const auditId = await auditService.createAudit(llmResponse, repo, prompt)
    const newAudit = await auditService.getAudit(auditId)
    return NextResponse.json({ audit: newAudit });
  } catch (error) {
    console.error('Audit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });    
  }
}