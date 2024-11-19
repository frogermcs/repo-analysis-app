import { NextResponse, NextRequest } from 'next/server'
import { RepositoryService } from '@/services/repository.service';

const repositoryService = new RepositoryService()

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  try {
    const body = await request.json();
    if (!body.text) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }
    const newRepositoryId = await repositoryService.createRepository(body.text)
    return NextResponse.json({ id: newRepositoryId });
  } catch (error) {
      console.error('Database insertion error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}