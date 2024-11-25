import { AuditService } from '@/services/audit.service';
import { LLMService } from '@/services/llm.service';
import { PromptLoader } from '@/services/prompt-loader.service';
import { RepositoryService } from '@/services/repository.service';
import { NextResponse, NextRequest } from 'next/server'

const repositoryService = new RepositoryService()
const auditService = new AuditService()
const llmService = new LLMService()
const promptLoader = new PromptLoader()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, audit: string }> }
) {
  try {
    const repoId = (await params).id;
    const promptId = (await params).audit;

    const repo = await repositoryService.getRepository(repoId)
    const prompt = await promptLoader.getPromptByFilenameId(promptId)

    if (!prompt || !repo) {
      throw new Error("Prompt or Repository not found");
  }

    const existingAudit = await auditService.getAuditForRepoAndPrompt(repoId, promptId)
    if (existingAudit) {
      return NextResponse.json({ audit: existingAudit });
    }
    
    const llmInput = [
      prompt.text, 
      repo.text
    ]
    
    const llmResponse = await llmService.generateAudit(llmInput)
    const auditId = await auditService.createAudit(llmResponse, repo.id, prompt.id)
    const newAudit = await auditService.getAudit(auditId)
    return NextResponse.json({ audit: newAudit });
  } catch (error) {
    console.error('Audit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });    
  }
}