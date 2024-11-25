import { NextResponse } from 'next/server'
import { PromptLoader } from '@/services/prompt-loader.service';

const promptLoader = new PromptLoader()

export async function GET() {
  try {
    const prompts = await promptLoader.getAllPrompts()
    
    if (!prompts) {
      return NextResponse.json({ error: 'Prompt not found.' }, { status: 404 });
    }

    return NextResponse.json({ prompts: prompts });
  } catch (error) {
    console.error('Database retrieval error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}