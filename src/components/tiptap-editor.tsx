import { RichTextProvider } from 'reactjs-tiptap-editor'
import { Editor, EditorContent, JSONContent, useEditor } from "@tiptap/react";

// Base Kit
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Dropcursor, Gapcursor, Placeholder, TrailingNode } from '@tiptap/extensions'
import { HardBreak } from '@tiptap/extension-hard-break'
import { TextStyle } from '@tiptap/extension-text-style';
import { ListItem } from '@tiptap/extension-list';


// Import CSS
import 'reactjs-tiptap-editor/style.css';

interface AppProps {
    content: JSONContent;
    onChange: (data: JSONContent) => void;
}

const extensions = [
    // Base Extensions
    Document,
    Text,
    Dropcursor,
    Gapcursor,
    HardBreak,
    Paragraph,
    TrailingNode,
    ListItem,
    TextStyle,
    Placeholder.configure({
        placeholder: 'Press \'/\' for commands',
    })

];


const TipTapEditor = ({ content, onChange }: AppProps) => {

    const editor = useEditor({
        textDirection: 'auto', // global text direction
        extensions,
        content,
        
        immediatelyRender: false,
        onUpdate: ({ editor }: { editor: Editor }) => {
            const json = editor.getJSON();
            onChange(json);
        },

    });

    return (
        <RichTextProvider
            editor={editor}
        >
            <EditorContent
                editor={editor}
            />
        </RichTextProvider>
    );
};

export default TipTapEditor;