'use client'

import { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { SidebarInset } from "@/components/ui/sidebar"
import { useAllPrompts } from '@/api-client/prompt-api.service';

export default function RepoAnalysis() {
  const [text, setText] = useState('');

  const { prompts, isLoading, isError } = useAllPrompts();

  useEffect(() => {
    if (prompts) {
      const promptsIds = prompts.map(prompt => prompt.id);
      const promptsText = "- " + promptsIds.join('\n- ')
      setText(promptsText);
    } else if (isLoading) {
      setText('Loading analysis...');
    } else if (isError) {
      setText('Error while fetching analysis: ' + isError.message);
    }
  }, [prompts, isLoading, isError]);

  return <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <h1 className="text-lg font-bold">Code Audit - Available promtps</h1>
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