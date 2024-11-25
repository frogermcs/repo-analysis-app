import { PrismaClient, Audit } from '@prisma/client';

const prisma = new PrismaClient();

export class AuditService {

  constructor() {

  }

  async createAudit(auditText: string, repositoryId: string, promptId: string): Promise<string> {  // Return ID
    const audit = await prisma.audit.create({
        data: {
            text: auditText,
            repositoryId: repositoryId,
            promptId: promptId
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