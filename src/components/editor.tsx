"use client"

import { useEffect, useRef } from "react"
import type EditorJS from "@editorjs/editorjs"
import type { OutputData } from "@editorjs/editorjs"

interface EditorProps {
  onChange: (data: OutputData) => void;
  data?: OutputData | null;
}

export default function Editor({ onChange, data }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (editorRef.current) return

    let timeout: ReturnType<typeof setTimeout>

    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default
      const Header = (await import("@editorjs/header")).default
      const List = (await import("@editorjs/list")).default

      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
        },
        placeholder: "Start writing your story...",

        data: data || { blocks: [] },

        async onChange(api) {
          clearTimeout(timeout)

          timeout = setTimeout(async () => {
            const content = await api.saver.save()
            onChange(content)
          }, 500)
        },

        onReady: () => {
          editorRef.current = editor
        },
      })
    }

    initEditor()

    return () => {
      editorRef.current?.destroy()
      editorRef.current = null
    }
  }, [onChange])

  return <div id="editorjs" />
}