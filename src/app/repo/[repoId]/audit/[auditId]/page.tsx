'use client'

import { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { SidebarInset } from "@/components/ui/sidebar"
import { useParams } from 'next/navigation';
import { useAudit } from '@/api-client/audit-api.service';

export default function RepoAnalysis() {
  const [text, setText] = useState('');
  const params = useParams<{ repoId: string, auditId: string }>();
  const repoId = params?.repoId;
  const auditId = params?.auditId;
  
  const { audit, isLoading, isError } = useAudit(repoId, auditId);

  useEffect(() => {
    if (audit) {
      setText(audit.text);
    } else if (isError) {
      setText('Error while fetching analysis: ' + isError.message);
    } else if (isLoading) {
      setText('Loading...');
    }
  }, [audit, isError, isLoading]);

  return <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <h1 className="text-lg font-bold">Code Audit - Architecture refactoring suggestions</h1>
    </header>
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="flex flex-col space-y-1.5 p-6 prose max-w-fit">
          <Markdown rehypePlugins={[rehypeHighlight]}>{text}</Markdown>
        </div>
      </div>
    </div>
  </SidebarInset>
}