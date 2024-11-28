'use client'

import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import {
  SidebarInset,
} from "@/components/ui/sidebar"

export default function RepoAnalysis() {
    const exampleMarkdown = ""+
    "# Header Header Header Header Header Header Header Header Header Header Header Header Header Header Header Header Header Header\n"+
    "## Example Analysis\n"+
    "\n"+
    "This is an example analysis of a repository. It contains various metrics and insights about the repository.\n"+
    "Lorem *ipsum* dolor sit amet, **consectetur adipiscing elit**. Nullam nec purus nec nunc ultricies ultricies.\n"+
    "Link example: [Google](https://www.google.com).\n" +
    "\n"+
    "This is an example analysis of a repository. It contains various metrics and insights about the repository.\n"+
    "Lorem *ipsum* dolor sit amet, **consectetur adipiscing elit**. Nullam nec purus nec nunc ultricies ultricies.\n"+
    "Link example: [Google](https://www.google.com).\n" +
    "\n"+
    "This is an example analysis of a repository. It contains various metrics and insights about the repository.\n"+
    "Lorem *ipsum* dolor sit amet, **consectetur adipiscing elit**. Nullam nec purus nec nunc ultricies ultricies.\n"+
    "Link example: [Google](https://www.google.com).\n" +
    "```js\n"+
    "console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!');\n"+
    "console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!');\n"+
    "console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!'); console.log('Hello, World!');\n"+
    "```\n" +
    "End of example analysis.\n"

    return <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <h1 className="text-lg font-bold">Code Audit - Your Input</h1>
    </header>
    <div className="flex p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-300 md:min-h-min max-w-full">
          <Markdown
            className="p-6 overflow-auto prose"
            rehypePlugins={[rehypeHighlight]}>{exampleMarkdown}</Markdown>
      </div>
    </div>
  </SidebarInset>
}