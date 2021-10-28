import DefaultTheme from 'vitepress/theme';
import './index.css';
import MyLayout from './MyLayout.vue';

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
