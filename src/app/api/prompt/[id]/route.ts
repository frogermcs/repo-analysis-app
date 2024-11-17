import { prisma } from '../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const repo = await prisma.prompt.findUnique({
      where: { id: String(id) },
    });

    if (!repo) {
      return NextResponse.json({ error: 'Repository not found.' }, { status: 404 });
    }

    return NextResponse.json({ text: repo.text });
  } catch (error) {
    console.error('Database retrieval error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}