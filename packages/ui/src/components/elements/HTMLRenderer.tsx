'use client';
import parse, { DOMNode, Element, Text } from 'html-react-parser';
import CodeBlock from './CodeBlock';
import ImageBlock from './ImageBlock';

// Type guards for better type checking
function isElement(node: DOMNode): node is Element {
  return node.type === 'tag';
}

function isText(node: DOMNode): node is Text {
  return node.type === 'text';
}

function hasChildren(node: Element): node is Element & { children: DOMNode[] } {
  return Array.isArray(node.children);
}

function getTextContent(children: DOMNode[]): string {
  return children
    .filter(isText)
    .map((child) => child.data)
    .join('');
}

export default function HTMLRenderer({ content }: { content: string }) {
  return (
    <div
      className="prose prose-slate dark:prose-invert w-full break-words text-wrap whitespace-pre-wrap max-w-none focus:outline-none min-h-[200px]
      prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1
      prose-pre:my-4 prose-pre:p-4 prose-pre:rounded-md prose-img:my-4
      prose-blockquote:my-4 prose-blockquote:pl-4 prose-blockquote:border-l-4
      prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
      dark:prose-pre:bg-gray-800 dark:prose-code:bg-gray-800"
    >
      {parse(content, {
        replace: (domNode: DOMNode) => {
          if (isElement(domNode)) {
            if (domNode.name === 'pre' && hasChildren(domNode)) {
              const codeElement = domNode.children.find(
                (child): child is Element =>
                  isElement(child as DOMNode) && (child as Element).name === 'code',
              );

              if (codeElement && hasChildren(codeElement)) {
                const codeContent = getTextContent(codeElement.children);
                return <CodeBlock code={codeContent} />;
              }
            }

            // Handle images
            if (domNode.name === 'img' && domNode.attribs) {
              const { src, alt } = domNode.attribs;
              return src ? <ImageBlock src={src} alt={alt || ''} /> : null;
            }
          }

          return undefined; // Let html-react-parser handle other elements normally
        },
      })}
    </div>
  );
}
