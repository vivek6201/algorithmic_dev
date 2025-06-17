'use client';

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@repo/ui/components/ui/select';
import { useEffect } from 'react';

const LANGUAGES = [
  'typescript',
  'javascript',
  'python',
  'java',
  'cpp',
  'c',
  'go',
  'ruby',
  'php',
  'bash',
  'html',
  'css',
  'scss',
  'json',
  'yaml',
  'sql',
];

export default function CodeBlockComponent({
  node,
  updateAttributes,
}: {
  node: any;
  updateAttributes: (attrs: any) => void;
}) {
  const language = node.attrs.language || 'typescript';

  return (
    <NodeViewWrapper className="relative group mt-6 rounded-md border border-zinc-800 bg-zinc-900 text-white font-mono shadow-md">
      <div className="absolute -top-6 right-0 z-10">
        <Select
          value={language}
          onValueChange={(value) => {
            console.log(language);
            updateAttributes({ language: value });
          }}
        >
          <SelectTrigger className="w-[150px] h-8 text-xs bg-zinc-800 text-white border-zinc-700 shadow-sm">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="max-h-60 bg-zinc-900 border-zinc-700 text-white text-xs">
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang} className="capitalize">
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <pre
        data-language={language}
        className="p-4 pt-6 overflow-x-auto text-sm leading-relaxed rounded-md"
      >
        <NodeViewContent as="code" className={`hljs language-${language}`} />
      </pre>
    </NodeViewWrapper>
  );
}
