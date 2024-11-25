import { promises as fs } from 'fs';

interface Prompt {
  filename: string;
  text: string;
}

export class PromptLoader {

  private async loadPrompts(): Promise<Prompt[]> {
        const files: string[] = await fs.readdir(process.cwd() + '/src/assets/prompts/', 'utf-8');
        const prompts = await Promise.all(files.map(async (filename) => {
          const file = await fs.readFile(process.cwd() + '/src/assets/prompts/' + filename, 'utf8');
          const prompt: Prompt = {filename: filename, text: file};
          return prompt;
        }));

        return prompts;
  }

  async getAllPrompts(): Promise<Prompt[]> {
    return await this.loadPrompts();
  }

  async getPromptByFilename(filename: string): Promise<Prompt | undefined> {
    return (await this.loadPrompts())
      .find((prompt) => prompt.filename === filename);
  }
}