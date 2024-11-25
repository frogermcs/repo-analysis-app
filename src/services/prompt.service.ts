import { PrismaClient, Prompt } from '@prisma/client';

const prisma = new PrismaClient();

export class PromptService {

  constructor() {

  }

  async createPrompt(text: string): Promise<string> {  // Return ID
    const prompt = await prisma.prompt.create({ data: { text } });
    return prompt.id;
  }

  async getPrompt(id: string): Promise<Prompt | null> {
    return prisma.prompt.findUnique({ where: { id } });
  }
}