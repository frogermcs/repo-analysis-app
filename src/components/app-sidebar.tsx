'use client'

import { useAllPrompts } from "@/api-client/prompt-api.service"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner';

export function AppSidebar({ repositoryId }: { repositoryId: string }) {
  const { prompts, isLoading, isError } = useAllPrompts()
  const menuItems = prompts?.map((prompt) => ({
    title: prompt.id,
    url: `/repo/${repositoryId}/audit/${prompt.id}`,
  })) || []

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your repository</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="repo">
                <SidebarMenuButton asChild>
                  <Link href={`/repo/${repositoryId}`}>
                    <span>Repo input</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Repository audit</SidebarGroupLabel>
          <SidebarGroupContent>
            {isLoading && <Spinner size="small" show={true}>Loading...</Spinner>}
            {isError && <div>Error loading prompts</div>}
            {!isLoading && !isError && (
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
