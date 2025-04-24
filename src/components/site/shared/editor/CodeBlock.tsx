"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "ts" }) => {
  const [copied, setCopied] = useState(false);
  const colors = ["bg-yellow-300", "bg-orange-300", "bg-red-600"];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md my-4">
      <div className="border-b bg-gray-900 py-2 px-5 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {colors.map((classname) => (
            <div
              key={classname}
              className={cn("rounded-full w-2.5 aspect-square", classname)}
            />
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-black/30 px-2 py-1 rounded"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-sm text-gray-100">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
