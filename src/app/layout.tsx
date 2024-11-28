'use client'

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const params = useParams<{ repoId: string }>();
  const repoId = params?.repoId;

  return <html>
      <head>
        
      </head>
      <body>
      <SidebarProvider>
        <AppSidebar repositoryId={repoId} />
        
          <SidebarTrigger />
          {children}
        
      </SidebarProvider>
    </body>
  </html>
}
