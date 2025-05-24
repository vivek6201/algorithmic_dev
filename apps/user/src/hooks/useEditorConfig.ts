import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import Youtube from '@tiptap/extension-youtube';
import { useEffect } from 'react';

interface UseEditorConfigProps {
  content: string;
  onChange: (content: string) => void;
}

export const useEditorConfig = ({ content, onChange }: UseEditorConfigProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable the default code block to prevent conflicts
      }),
      Link,
      Image,
      CodeBlock,
      Youtube.configure({
        allowFullscreen: false,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
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
