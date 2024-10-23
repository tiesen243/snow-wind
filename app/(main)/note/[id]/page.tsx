import { notFound } from 'next/navigation'
import React from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import { api, HydrateClient } from '@/lib/trpc/server'
import { PageClient } from './page.client'

const Page: React.FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const note = await api.note.getById({ id })
  if (!note) notFound()

  return (
    <HydrateClient>
      <TooltipProvider>
        <PageClient id={id} />
      </TooltipProvider>
    </HydrateClient>
  )
}

export default Page
