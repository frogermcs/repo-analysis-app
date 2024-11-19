import { PromptService } from '@/services/prompt.service';
import { NextResponse, NextRequest } from 'next/server'

const promptService = new PromptService()

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  try {
    const body = await request.json();
    if (!body.text) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }
  
    const newPromptId = await promptService.createPrompt(body.text)
    return NextResponse.json({ id: newPromptId });
  } catch (error) {
      console.error('Database insertion error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}