'use client';

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Extension, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockComponent from './CodeBlockComponent'; // React component

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      exitOnTripleEnter: false,
      exitOnArrowDown: false,
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        parseHTML: (element) => element.getAttribute('data-language') || 'typescript',
        renderHTML: (attributes) => {
          return {
            'data-language': attributes.language,
          };
        },
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      Enter: () => {
        const { state, dispatch } = this.editor.view;
        const { $from } = state.selection;
        const node = $from.node();
        if (node.type.name !== 'codeBlock') return false;

        dispatch(state.tr.insertText('\n'));
        return true;
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
});

export const IndentList = Extension.create({
  name: 'indentList',

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.sinkListItem('listItem'),
      'Shift-Tab': () => this.editor.commands.liftListItem('listItem'),
    };
  },
});
