import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { useEffect } from 'react';
import { all, createLowlight } from 'lowlight';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { IndentList } from '@/components/shared/editor/CustomBlocks';

interface UseEditorConfigProps {
  content: string;
}

export const lowlight = createLowlight(all);

export const useEditorConfig = ({ content }: UseEditorConfigProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      ImageResize,
      Link,
      Youtube.configure({
        controls: true,
        nocookie: true,
        enableIFrameApi: true,
        allowFullscreen: true,
        width: 560,
        height: 315,
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg shadow-sm my-4 max-w-full h-auto',
        },
        inline: false,
        addPasteHandler: true,
      }),
      IndentList,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4 prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-pre:my-4 prose-pre:p-4 prose-pre:rounded-md prose-img:my-4 prose-blockquote:my-4 prose-blockquote:pl-4 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 dark:prose-pre:bg-gray-800 dark:prose-code:bg-gray-800 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:max-w-full [&_iframe]:h-auto [&_iframe]:rounded-lg',
      },
    },
  });

  // ✅ Sync editor content when external `content` changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return editor;
};
