'use client';

import uploadFileToCloud from '@/actions/common/upload-file';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  ImageIcon,
  YoutubeIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link,
} from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import { Toggle } from '@repo/ui/components/ui/toggle';
import { Editor } from '@tiptap/react';

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const form = new FormData();
      form.append('file', file);

      const res = await uploadFileToCloud(form);
      editor.chain().focus().setImage({ src: res.secure_url }).run();
    };

    input.click();
  };

  const insertYoutube = () => {
    const url = prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const insertLink = () => {
    const url = prompt('Enter link');
    if (url) {
      editor.commands.setLink({
        href: url,
        target: '__blank',
      });
    }
  };

  const headingLevels = [
    { level: 1, icon: Heading1 },
    { level: 2, icon: Heading2 },
    { level: 3, icon: Heading3 },
    { level: 4, icon: Heading4 },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-1 border-b">
      {/* Toggle Buttons */}
      <Toggle
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Toggle>

      <Toggle
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Toggle>

      <Toggle
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={16} />
      </Toggle>

      <Toggle
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </Toggle>

      <Toggle
        pressed={editor.isActive('codeBlock')}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code size={16} />
      </Toggle>

      <Toggle
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Toggle>

      <Toggle
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Toggle>

      <Toggle
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} />
      </Toggle>

      {headingLevels.map(({ level, icon: Icon }) => (
        <Toggle
          key={level}
          pressed={editor.isActive('heading', { level })}
          onPressedChange={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: level as any })
              .run()
          }
        >
          <Icon size={16} />
        </Toggle>
      ))}

      {/* Non-Toggle Actions */}
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={16} />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={16} />
      </Button>

      <Button type="button" size="icon" variant="outline" onClick={insertImage}>
        <ImageIcon size={16} />
      </Button>

      <Button type="button" size="icon" variant="outline" onClick={insertYoutube}>
        <YoutubeIcon size={16} />
      </Button>
      <Button type="button" size="icon" variant="outline" onClick={insertLink}>
        <Link size={16} />
      </Button>
    </div>
  );
}
