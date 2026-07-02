import { RichTextProvider } from 'reactjs-tiptap-editor'
import { EditorContent, useEditor } from "@tiptap/react";

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
import { CodeBlock, RichTextCodeBlock } from 'reactjs-tiptap-editor/codeblock';
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
import { Image, RichTextImage } from 'reactjs-tiptap-editor/image';

import { createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

// Bubble Menu
import {
    RichTextBubbleColumns,
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
import { useFormContext } from 'react-hook-form';



const lowlight = createLowlight();
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);


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
    CodeBlock.configure({
        lowlight: lowlight,
    }),
    CodeView,
    FontFamily,
    FontSize,
    Heading,
    Italic,
    OrderedList,
    TextAlign,
    TextDirection,
    TextUnderline,
    Clear,
    Image.configure({
        upload: (file: File) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(URL.createObjectURL(file))
                }, 500)
            })
        },
    }),
];

const RichTextToolbar = () => {
    const groupClass =
        "flex items-center gap-1 px-2 border-r border-slate-200 last:border-0";

    return (
        <div className="flex items-center flex-wrap gap-1">

            {/* History */}
            <div className={groupClass}>
                <RichTextUndo />
                <RichTextRedo />
            </div>

            {/* Text Style */}
            <div className={groupClass}>
                <RichTextBold />
                <RichTextItalic />
                <RichTextUnderline />
                <RichTextCode />
            </div>

            {/* Headings & Typography */}
            <div className={groupClass}>
                <RichTextHeading />
                <RichTextFontFamily />
                <RichTextFontSize />
            </div>

            {/* Lists & Alignment */}
            <div className={groupClass}>
                <RichTextBulletList />
                <RichTextOrderedList />
                <RichTextAlign />
                <RichTextTextDirection />
            </div>

            {/* Block Elements */}
            <div className={groupClass}>
                <RichTextBlockquote />
                <RichTextCodeBlock />
                <RichTextCodeView />
            </div>

            {/* Media */}
            <div className={groupClass}>
                <RichTextImage /> {}
            </div>

            {/* Utilities */}
            <div className={groupClass}>
                <RichTextClear />
            </div>

        </div>
    );
};

const RichTextBubbleMenu = () => {
    return (
        <>
            {/* Text */}
            <RichTextBubbleText />
            <RichTextBubbleLink />

            {/* Images & Media */}
            <RichTextBubbleImage />
            <RichTextBubbleVideo />
            <RichTextBubbleImageGif />

            {/* Tables */}
            <RichTextBubbleTable />

            {/* Code */}
            <RichTextBubbleCodeBlock />

            {/* Layout */}
            <RichTextBubbleColumns />
            <RichTextBubbleCallout />

            {/* Math & Diagrams */}
            <RichTextBubbleKatex />
            <RichTextBubbleMermaid />
            <RichTextBubbleExcalidraw />

            {/* Embeds */}
            <RichTextBubbleIframe />
            <RichTextBubbleTwitter />

            {/* Drag Handle */}
            <RichTextBubbleMenuDragHandle />

            {/* Slash Command */}
            <SlashCommandList />
        </>
    );
};


const TipTapEditor = () => {

    const { setValue, watch } = useFormContext();

    const content = watch('content')

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
            setValue("content", editor.getJSON(), {
                shouldDirty: true,
            });
        }
    });

    if (!editor) return <TiptapLoader />

    return (

        <div className="relative w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all ">

            <RichTextProvider editor={editor}>

                <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 p-2">
                    <RichTextToolbar />
                </div>

                {/* 3. The Editing Surface */}
                <div className="relative min-h-125 cursor-text bg-slate-50/30">
                    <RichTextBubbleMenu />

                    <EditorContent editor={editor} />
                </div>
            </RichTextProvider>
        </div>
    );
};

export default TipTapEditor;