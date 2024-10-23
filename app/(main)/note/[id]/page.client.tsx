'use client'

import type { Content } from '@tiptap/core'
import { useState } from 'react'

import { MinimalTiptapEditor } from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const [note] = api.note.getById.useSuspenseQuery({ id })

  const [title, setTitle] = useState<string>(note?.title ?? '')
  const [content, setContent] = useState<Content>(note?.content ?? '')

  const utils = api.useUtils()
  const update = api.note.update.useMutation({
    onSuccess: () => utils.note.invalidate(),
  })

  return (
    <div className="flex flex-col gap-4 py-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <MinimalTiptapEditor
        value={content}
        onChange={setContent}
        editorContentClassName="p-5"
        immediatelyRender={false}
        output="html"
        placeholder="Type your description here..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-none"
      />

      <Button
        onClick={() => update.mutate({ id: note?.id ?? '', title, content: content as string })}
        disabled={update.isPending}
      >
        Update
      </Button>
    </div>
  )
}
