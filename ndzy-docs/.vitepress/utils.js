import fs from 'fs';
import path from 'path';

const docsRoot = path.join(__dirname, '../');
const docsName = docsRoot.split('/')[docsRoot.split('/').length - 2];

export const readFileList = (
  dir = docsRoot,
  filesList = [],
  dirList = [],
  dirName = '',
  pages = [],
) => {
  const files = fs.readdirSync(dir);

  files.forEach((item) => {
    const filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);

    // 忽略 .vitepress imgs 文件夹
    if (stat.isDirectory() && item !== '.vitepress' && item !== 'public') {
      readFileList(path.join(dir, item), filesList, dirList, item, pages);
      dirList.push(item);
    } else {
      const fileNameArr = path.basename(filePath).split('.');
      // 文件名称
      const name = fileNameArr[0];
      // 文件类型
      const type = fileNameArr[1];
      // sidebar 文件路径
      const path_ = filePath.split(`/${docsName}`)[1].split('.')[0];

      if (type === 'md') {
        pages.push({
          page: fs.readFileSync(filePath, 'utf-8'),
          path: `${filePath.split(`/${docsName}`)[1].replace('.md', '.html')}`,
          name: path_,
          _id: name,
        });
      }

      if (type === 'md' && name !== 'index') {
        filesList.push({
          name,
          // sidebar 文件夹
          dirName: `/${dirName}/`,
          path: path_,
        });
      }
    }
  });
  return { filesList, dirList, pages };
};
const fn = () => {
  const { filesList, dirList, pages } = readFileList();
  const nav = [];
  const sidebar = {};

  dirList.map((_) => {
    const obj = { text: _, link: `/${_}/` };
    nav.push(obj);
    // 添加首页
    sidebar[`/${_}/`] = [
      // 首页排在最前面
      { text: _, link: `/${_}/index.html`, sort: '-100000000_' },
    ];

    return _;
  });

  filesList.map((_) => {
    const obj = { text: _.name.split('_')[1], link: _.path, sort: _.name };
    sidebar[_.dirName].push(obj);

    return _;
  });

  // 排序
  dirList.map((_) => {
    sidebar[`/${_}/`] = sidebar[`/${_}/`].sort(
      (a, b) => a.sort.split('_')[0] - b.sort.split('_')[0],
    );

    return _;
  });

  return { nav, pages, sidebar };
};

export const nav = fn().nav;
export const pages = fn().pages;
export const sidebar = fn().sidebar;
