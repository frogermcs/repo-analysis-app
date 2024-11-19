import { RepositoryService } from '@/services/repository.service';
import { NextResponse, NextRequest } from 'next/server'

const repositoryService = new RepositoryService()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  
  try {
    const id = (await params).id;
    const repo = await repositoryService.getRepository(id)

    if (!repo) {
      return NextResponse.json({ error: 'Repository not found.' }, { status: 404 });
    }

    return NextResponse.json({ text: repo.text });
  } catch (error) {
    console.error('Database retrieval error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}