import { nav, sidebar, pages } from './utils';

export default {
  title: 'docs',
  description: 'docs',
  docsDir: 'ndzy-docs',
  markdown: {
    config: (md) => {
      md.use(require('markdown-it-copy'), { btnText: '复制' }).use(
        require('markdown-it-anchor'),
        {},
      );
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
