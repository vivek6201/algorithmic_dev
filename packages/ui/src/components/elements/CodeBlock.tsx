'use client';
import React, { useEffect, useState } from 'react';
import { Copy, Check } from '@repo/ui';
import { cn } from '@repo/ui/lib/utils';
import { createLowlight, all } from 'lowlight';
import 'highlight.js/styles/github-dark.css';

type CodeBlockProps = {
  code: string;
  language?: string;
};

const lowlight = createLowlight(all);

const renderNode = (node: any, index: number): React.ReactNode => {
  if (node.type === 'text') {
    return node.value;
  }

  const Tag = node.tagName || 'span';
  return (
    <Tag key={index} className={node.properties?.className?.join(' ')}>
      {node.children?.map((child: any, i: number) => renderNode(child, i))}
    </Tag>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const colors = ['bg-yellow-300', 'bg-orange-300', 'bg-red-600'];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = lowlight.highlightAuto(code);

  return (
    <div className="not-prose bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md my-4">
      <div className="border-b bg-[#151c25dc] dark:bg-gray-900 py-2 px-5 flex justify-between items-center border-none shadow ">
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

      <pre className="overflow-x-auto text-sm text-gray-100 bg-gray-800 dark:bg-transparent">
        <code className={`hljs`}>
          {highlighted.children.map((node, index) => renderNode(node, index))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
