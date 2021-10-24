module.exports = {
  title: 'docs',
  description: 'docs',
  docsDir: 'docs',
  base: '/docs/',
  themeConfig: {
    algolia: {
      apiKey: 'ef66bb20104d82b7c4f08621b4c73c92',
      indexName: 'ndzy-docs',
    },
    nav: [
      { text: '收集箱', link: '/sjx/' },
      { text: 'dva', link: '/dva/' },
    ],
    sidebar: {
      '/sjx/': [
        {
          text: '收集箱',
          children: [{ text: '中午', link: '/sjx/中午' }],
        },
      ],
      '/dva/': [
        {
          text: 'dva',
          children: [
            { text: 'index', link: '/dva/' },
            { text: 'dva', link: '/dva/dva' },
          ],
        },
      ],
    },
  },
};
