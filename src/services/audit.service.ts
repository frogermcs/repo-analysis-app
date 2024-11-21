import { PrismaClient, Prompt, Repository, Audit } from '@prisma/client';

const prisma = new PrismaClient();

export class AuditService {

  constructor() {

  }

  async createAudit(auditText: string, repository: Repository, prompt: Prompt): Promise<string> {  // Return ID
    const audit = await prisma.audit.create({
        data: {
            text: auditText,
            repositoryId: repository.id,
            promptId: prompt.id
        }}
    )
    
    return audit.id;
  }

  async getAudit(id: string): Promise<Audit | null> {
    return prisma.audit.findUnique({ where: { id } })
  }

  async getAuditForRepoAndPrompt(repoId: string, promptId: string) {
    return prisma.audit.findFirst({
        where: {
            repositoryId: repoId,
            promptId: promptId
        }
    })
  }
}