import { JSONContent } from '@tiptap/react'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Color from '@tiptap/extension-color'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import TextAlign from '@tiptap/extension-text-align'
import { FontFamily, TextStyle } from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'

export const GeneratHtml = (content: JSONContent) => {
    return generateHTML(content, [
        StarterKit.configure({
            // Disable extensions that we are configuring manually below
            heading: false,
            blockquote: false,
            bold: false,
            italic: false,
        }),
        // Manually configured extensions to match your editor
        Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
        }),
        Blockquote,
        Bold,
        Italic,
        BulletList,
        OrderedList,
        ListItem,
        Code,
        TextStyle,
        Color,
        FontFamily,
        Typography,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        // Placeholder and History aren't needed for read-only HTML, 
        // but including the schema-related ones is vital.
    ])
}
