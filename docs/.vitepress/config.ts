module.exports = {
  title: 'docs',
  description: 'docs',
  docsDir: 'docs',
  themeConfig: {
    algolia: {
      //   appId: "ELMZBWYVTV",
      apiKey: 'ef66bb20104d82b7c4f08621b4c73c92',
      indexName: 'ndzy-docs',
    },
    nav: [{ text: '收集箱', link: '/' }],
    sidebar: {
      '/': [
        {
          text: '收集箱',
          children: [
            { text: 'dva', link: '/sjx/dva' },
            { text: '中午', link: '/sjx/中午' },
          ],
        },
      ],
    },
  },
};
