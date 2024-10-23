'use client'

import Link from 'next/link'

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { api } from '@/lib/trpc/react'

export const AppSidebarClient: React.FC = () => {
  const { data: notes = [], isLoading } = api.note.list.useQuery()

  if (isLoading)
    return Array.from({ length: 10 }).map((_, i) => (
      <SidebarMenuItem key={i}>
        <SidebarMenuButton className="animate-pulse" asChild>
          <div className="h-2 w-full rounded-md bg-secondary" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))

  return notes.map((note) => (
    <SidebarMenuItem key={note.id}>
      <SidebarMenuButton className="line-clamp-1" asChild>
        <Link href={`/note/${note.id}`}>{note.title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))
}
