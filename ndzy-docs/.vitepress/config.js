import { nav, sidebar, pages } from './utils';

export default {
  title: 'docs',
  description: 'docs',
  docsDir: 'ndzy-docs',
  markdown: {
    anchor: { permalink: false },
    config: (md) => {
      md.use(require('markdown-it-copy'), { btnText: '复制' });
    },
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.png',
      },
    ],
  ],
  themeConfig: {
    logo: '/favicon.png',
    nav,
    sidebar,
    pages,
  },
};
