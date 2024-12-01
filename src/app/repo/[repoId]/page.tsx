'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { SidebarInset } from "@/components/ui/sidebar"
import { useRepository } from '@/api-client/repo-api.service';

export default function Repo() {
  const [text, setText] = useState('');
  const params = useParams<{ repoId: string }>();
  const repoId = params?.repoId;
  const { repository, isLoading, isError } = useRepository(repoId);

  useEffect(() => {
    if (repository) {
      setText(repository.text);
    } else if (isLoading) {
      setText('Loading repository...');
    } else if (isError) {
      setText('Error fetching repository: ' + isError.message);
    } 
  }, [repository, isLoading, isError]);


  return <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <h1 className="text-lg font-bold">Code Audit - Your Input</h1>
    </header>
    <div className="flex p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min max-w-full">
          <Markdown
            className="p-6 overflow-auto prose"
            rehypePlugins={[rehypeHighlight]}>{text}</Markdown>
      </div>
    </div>
  </SidebarInset>

}
