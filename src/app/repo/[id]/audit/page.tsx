'use client'

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import {
  SidebarInset,
} from "@/components/ui/sidebar"

export default function RepoAnalysis() {
    const [text, setText] = useState('');

    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error } = useSWR(`/api/example-analysis`, fetcher);

    useEffect(() => {
        if (data) {
          setText(data.text);
        } else if (error) {
          setText('Error fetching analysis: ' + error.message);
        }
      }, [data, error]);

      return <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <h1 className="text-lg font-bold">Analysis</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">        
          <div className="flex flex-col space-y-1.5 p-6 prose">
            <Markdown rehypePlugins={[rehypeHighlight]}>{text}</Markdown>
          </div>
        </div>
      </div>
    </SidebarInset>
}