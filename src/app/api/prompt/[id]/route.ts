import { PromptService } from '@/services/prompt.service';
import { NextResponse, NextRequest } from 'next/server'

const promptService = new PromptService()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const prompt = await promptService.getPrompt(id)
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found.' }, { status: 404 });
    }

    return NextResponse.json({ prompt: prompt });
  } catch (error) {
    console.error('Database retrieval error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}