import { PrismaClient } from '@prisma/client';
import { Repository } from '@prisma/client';

const prisma = new PrismaClient();

export class RepositoryService {

  constructor() {

  }

  async createRepository(text: string): Promise<string> {  // Return ID
    const repo = await prisma.repository.create({ data: { text } });
    return repo.id;
  }

  async getRepository(id: string): Promise<Repository | null> {
    return prisma.repository.findUnique({ where: { id } });
  }
}