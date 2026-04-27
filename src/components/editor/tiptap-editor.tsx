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
import { SlashCommandList } from 'reactjs-tiptap-editor/slashcommand';



// Import CSS
import 'reactjs-tiptap-editor/style.css';

// Extension
import { History, RichTextUndo, RichTextRedo } from 'reactjs-tiptap-editor/history';
import { Blockquote, RichTextBlockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold, RichTextBold } from 'reactjs-tiptap-editor/bold';
import { BulletList, RichTextBulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Code, RichTextCode } from 'reactjs-tiptap-editor/code';
// import { CodeBlock, RichTextCodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { CodeView, RichTextCodeView } from 'reactjs-tiptap-editor/codeview';
import { FontFamily, RichTextFontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize, RichTextFontSize } from 'reactjs-tiptap-editor/fontsize';
import { Heading, RichTextHeading } from 'reactjs-tiptap-editor/heading';
import { Italic, RichTextItalic } from 'reactjs-tiptap-editor/italic';
import { OrderedList, RichTextOrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { TextAlign, RichTextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextDirection, RichTextTextDirection } from 'reactjs-tiptap-editor/textdirection';
import { TextUnderline, RichTextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { Clear, RichTextClear } from 'reactjs-tiptap-editor/clear';

// import { createLowlight } from 'lowlight';
// import css from 'highlight.js/lib/languages/css';
// import js from 'highlight.js/lib/languages/javascript';
// import ts from 'highlight.js/lib/languages/typescript';
// import html from 'highlight.js/lib/languages/xml';

// Bubble Menu
import {
    RichTextBubbleColumns,
    RichTextBubbleDrawer,
    RichTextBubbleExcalidraw,
    RichTextBubbleIframe,
    RichTextBubbleKatex,
    RichTextBubbleLink,
    RichTextBubbleImage,
    RichTextBubbleVideo,
    RichTextBubbleImageGif,
    RichTextBubbleMermaid,
    RichTextBubbleTable,
    RichTextBubbleText,
    RichTextBubbleTwitter,
    RichTextBubbleCallout,
    RichTextBubbleCodeBlock,

    // Drag Handle
    RichTextBubbleMenuDragHandle

    // ... other bubble menu components
} from 'reactjs-tiptap-editor/bubble';
import TiptapLoader from './TiptapLoader';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
// import { Count } from './Count';

interface AppProps {
    content: JSONContent;
    onChange: (data: JSONContent) => void;
}

// const lowlight = createLowlight();
// lowlight.register('html', html);
// lowlight.register('css', css);
// lowlight.register('js', js);
// lowlight.register('ts', ts);


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
    }),

    History,
    // Import Extensions Here
    Blockquote,
    Bold,
    BulletList,
    Code,
    // CodeBlock.configure({
    //     lowlight: lowlight,
    // }),
    CodeView,
    FontFamily,
    FontSize,
    Heading,
    Italic,
    OrderedList,
    TextAlign,
    TextDirection,
    TextUnderline,
    Clear

];

const RichTextToolbar = () => {
    const groupClass = "flex items-center gap-1 px-2 border-r border-slate-200 last:border-0";

    return (
        <div className="flex items-center gap-1 flex-wrap">
            <div className={groupClass}>
                <RichTextUndo />
                <RichTextRedo />
                <RichTextClear />
            </div>

            <div className={groupClass}>
                <RichTextHeading />
                <RichTextFontFamily />
                <RichTextFontSize />
            </div>

            <div className={groupClass}>
                <RichTextBold />
                <RichTextItalic />
                <RichTextUnderline />
                <RichTextTextDirection />
            </div>

            <div className={groupClass}>
                <RichTextOrderedList />
                <RichTextBulletList />
                <RichTextAlign />
            </div>

            <div className={groupClass}>
                <RichTextBlockquote />
                <RichTextCode />
                <RichTextCodeView />
            </div>
        </div>
    );
};

const RichTextBubbleMenu = () => {
    return (
        <div>
            <RichTextBubbleColumns />
            <RichTextBubbleDrawer />
            <RichTextBubbleExcalidraw />
            <RichTextBubbleIframe />
            <RichTextBubbleKatex />
            <RichTextBubbleLink />

            <RichTextBubbleImage />
            <RichTextBubbleVideo />
            <RichTextBubbleImageGif />

            <RichTextBubbleMermaid />
            <RichTextBubbleTable />
            <RichTextBubbleText />
            <RichTextBubbleTwitter />
            <RichTextBubbleCallout />

            <RichTextBubbleMenuDragHandle />

            <RichTextBubbleCodeBlock />

            <SlashCommandList /> {/* Optional: If you want to use Slash Command inside Bubble Menu */}
        </div>
    )
}

const TipTapEditor = ({ content, onChange }: AppProps) => {
    
    const debouncedUpdates = useMemo(
        () =>
            debounce((editor: Editor) => {
                const json = editor.getJSON();
                onChange(json);
            }, 500),
        [onChange]
    );

    // Clean up the debounce if the component unmounts
    useEffect(() => {
        return () => {
            debouncedUpdates.cancel();
        };
    }, [debouncedUpdates]);
    const editor = useEditor({
        extensions,
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[400px] max-w-none',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
    });

     useEffect(() => {
        if (editor && content !== editor.getJSON()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return <TiptapLoader />

    return (
        // 1. The Outer Shell: Border, shadow, and rounded corners
        <div className="relative w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400">

            <RichTextProvider editor={editor}>
                {/* 2. The Sticky Toolbar: Stays visible while scrolling long docs */}
                <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 p-2">
                    <RichTextToolbar />
                </div>

                {/* 3. The Editing Surface */}
                <div className="relative min-h-125 cursor-text bg-slate-50/30">
                    <RichTextBubbleMenu />

                    {/* Only show CodeBlock bubble when specifically inside a code block */}
                    <RichTextBubbleCodeBlock />

                    <EditorContent editor={editor} />
                </div>
                <div>
                    {/* <Count editor={editor} /> */}
                </div>
            </RichTextProvider>
        </div>
    );
};

export default TipTapEditor;