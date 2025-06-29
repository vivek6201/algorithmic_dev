'use client';

import { Extension } from '@tiptap/react';

export const IndentList = Extension.create({
  name: 'indentList',

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.sinkListItem('listItem'),
      'Shift-Tab': () => this.editor.commands.liftListItem('listItem'),
    };
  },
});
