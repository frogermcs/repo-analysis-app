import { PrismaClient, Prompt } from '@prisma/client';
import { promises as fs } from 'fs';

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

  async getPromptsFromFiles(): Promise<string> {
    const file = await fs.readFile(process.cwd() + '/src/assets/prompts/architecture-refactoring.md', 'utf8');
    return file;
  }
}