import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { useEffect } from 'react';
import { all, createLowlight } from 'lowlight';

import { CustomCodeBlock, IndentList } from '@/components/site/shared/editor/CustomBlocks';

interface UseEditorConfigProps {
  content: string;
  onChange: (content: string) => void;
}

export const lowlight = createLowlight(all);

export const useEditorConfig = ({ content, onChange }: UseEditorConfigProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      ImageResize,
      Link,
      Youtube.configure({
        HTMLAttributes: {
          class: 'rounded-md aspect-video w-10/12',
        },
      }),
      IndentList,
      CustomCodeBlock.configure({ lowlight }),
    ],
    immediatelyRender: false,
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4 prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-pre:my-4 prose-pre:p-4 prose-pre:rounded-md prose-img:my-4 prose-blockquote:my-4 prose-blockquote:pl-4 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 dark:prose-pre:bg-gray-800 dark:prose-code:bg-gray-800',
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
