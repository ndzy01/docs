import { nav, sidebar } from './data';

export default {
  title: 'docs',
  description: 'docs',
  docsDir: 'docs',
  themeConfig: {
    algolia: {
      apiKey: 'ef66bb20104d82b7c4f08621b4c73c92',
      indexName: 'ndzy-docs',
    },
    nav,
    sidebar,
  },
};
