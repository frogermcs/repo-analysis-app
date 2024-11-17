import { prisma } from '../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  const body = await request.json();
  const text = body.text;

  try {
    if (!text) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }
  
    const newPrompt = await prisma.prompt.create({
      data: { text },
    });

    return NextResponse.json({ id: newPrompt.id });
  } catch (error) {
      console.error('Database insertion error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}