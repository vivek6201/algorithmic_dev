'use client';
import React, { useState } from 'react';
import { Copy, Check } from '@repo/ui';
import { cn } from '@repo/ui/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const colors = ['bg-yellow-300', 'bg-orange-300', 'bg-red-600'];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md my-4">
      <div className="border-b bg-[#1D1F21] dark:bg-gray-900 py-2 px-5 flex justify-between items-center shadow-md dark:shadow-none border-none">
        <div className="flex gap-2 items-center">
          {colors.map((classname) => (
            <div key={classname} className={cn('rounded-full w-2.5 aspect-square', classname)} />
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <SyntaxHighlighter language="javascript" style={atomDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
