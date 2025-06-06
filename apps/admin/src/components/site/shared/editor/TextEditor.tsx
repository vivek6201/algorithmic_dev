'use client';
import React from 'react';
import { EditorContent } from '@tiptap/react';
import { cn } from '@repo/ui/lib/utils';
import MenuBar from './MenuBar';
import { useEditorConfig } from '@/hooks/useEditorConfig';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, className }) => {
  const editor = useEditorConfig({ content, onChange });
  return (
    <div className={cn('border rounded-md overflow-hidden', className)}>
      <MenuBar editor={editor} />
      <div className="ProseMirror-content max-h-[470px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
