import { config } from '@repo/eslint-config/library.js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,

  {
    ignores: ['node_modules/prisma', './generated'],
  },
];
