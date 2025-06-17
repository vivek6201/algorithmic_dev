'use client';
import parse from 'html-react-parser';
import CodeBlock from './CodeBlock';
import ImageBlock from './ImageBlock';

export default function HTMLRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[200px] prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-pre:my-4 prose-pre:p-4 prose-pre:rounded-md prose-img:my-4 prose-blockquote:my-4 prose-blockquote:pl-4 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 dark:prose-pre:bg-gray-800 dark:prose-code:bg-gray-800">
      {parse(content, {
        replace: (domNode: any) => {
          if (domNode.type === 'tag') {
            // Custom Code Block Replacement
            if (domNode.name === 'pre' && domNode.children?.[0]?.name === 'code') {
              console.log({ domNode });
              const codeContent =
                domNode.children[0].children?.map((c: any) => c.data).join('') || '';
              return <CodeBlock code={codeContent} />;
            }

            // Custom Image Replacement
            if (domNode.name === 'img') {
              const { src, alt } = domNode.attribs;
              return <ImageBlock src={src} alt={alt || ''} />;
            }
          }
        },
      })}
    </div>
  );
}
