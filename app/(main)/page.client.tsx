'use client'

import type { Content } from '@tiptap/core'
import { useState } from 'react'

import { MinimalTiptapEditor } from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<Content>('')

  const utils = api.useUtils()
  const create = api.note.create.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate()
      setTitle('')
      setContent('')
    },
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
        onClick={() => create.mutate({ title, content: String(content) })}
        disabled={create.isPending}
        className="mt-2"
      >
        Create
      </Button>
    </div>
  )
}
