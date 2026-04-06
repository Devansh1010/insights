"use client"

import { useEffect, useRef, memo } from "react"
import type EditorJS from "@editorjs/editorjs"
import type { OutputData } from "@editorjs/editorjs"
import type { ToolConstructable } from '@editorjs/editorjs';

interface EditorProps {
  onChange: (data: OutputData) => void;
  data?: OutputData | null;
}

const Editor = ({ onChange, data }: EditorProps) => {
  const editorRef = useRef<EditorJS | null>(null)
  const holderId = useRef(`editorjs-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    let isMounted = true;
    let editorInstance: EditorJS | null = null;

    const initEditor = async () => {
      // Dynamic Imports
      const EditorJS = (await import("@editorjs/editorjs")).default
      const Header = (await import("@editorjs/header")).default
      const List = (await import("@editorjs/list")).default
      const Embed = (await import("@editorjs/embed")).default
      const Quote = (await import("@editorjs/quote")).default
      const InlineCode = (await import("@editorjs/inline-code")).default
      const Marker = (await import("@editorjs/marker")).default
      const CodeTool = (await import("@editorjs/code")).default

      if (!isMounted) return;

      editorInstance = new EditorJS({
        holder: holderId.current,
        tools: {
          header: {
            class: Header as unknown as ToolConstructable,
            config: {
              placeholder: 'Enter a heading',
              levels: [2, 3, 4],
              defaultLevel: 2
            }
          },
          list: List,
          quote: Quote,
          marker: Marker,
          inlineCode: InlineCode,
          code: CodeTool,
          embed: Embed,
        },
        data: data || { blocks: [] },
        placeholder: "start typing your story...",
        async onChange(api) {
          const content = await api.saver.save()
          onChange(content)
        },
      })

      editorRef.current = editorInstance
    }

    initEditor()

    return () => {
      isMounted = false;
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    }

  })

  return (
    <div
      id={holderId.current}
      className="
    prose prose-neutral max-w-none min-h-125 
    /* Light Mode Styles */
    prose-p:text-secondary-foreground/90 prose-p:leading-relaxed
    prose-headings:text-foreground prose-headings:font-bold
    
    /* Dark Mode Styles */
    dark:prose-invert 
    dark:prose-p:text-zinc-400 
    dark:prose-headings:text-zinc-100
    
    /* UI Polish */
    selection:bg-primary/10
    focus:outline-none
  "
    />
  )
}

// Memoize to prevent parent re-renders from touching the editor
export default memo(Editor)