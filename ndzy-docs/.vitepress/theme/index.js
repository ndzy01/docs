import DefaultTheme from 'vitepress/theme';
import './index.css';
import Layout from './Layout.vue';
import Search from './Search.vue';
import Date from './Date.vue';

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Search', Search);
    app.component('Date', Date);
  },
};
