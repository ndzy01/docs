import { nav, sidebar, pages } from '../../readFiles';

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
  themeConfig: {
    nav,
    sidebar,
    pages,
  },
};
