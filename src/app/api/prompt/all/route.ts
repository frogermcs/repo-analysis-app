import { PromptService } from '@/services/prompt.service';
import { NextResponse } from 'next/server'

const promptService = new PromptService()

export async function GET() {
  try {
    const prompt = await promptService.getPromptsFromFiles()
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found.' }, { status: 404 });
    }

    return NextResponse.json({ prompt: prompt });
  } catch (error) {
    console.error('Database retrieval error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}