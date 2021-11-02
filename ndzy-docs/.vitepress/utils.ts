const fs = require('fs');
const path = require('path');
const docsRoot = path.join(__dirname, '../');

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

    if (stat.isDirectory() && item !== '.vitepress' && item !== 'public') {
      readFileList(path.join(dir, item), filesList, dirList, item, pages);
      dirList.push(item);
    } else {
      const flag1 = '/ndzy-docs';
      const flag2 = '/ndzy-docs/';
      const fileNameArr = path.basename(filePath).split('.');
      const name = fileNameArr[0];
      const type = fileNameArr[1];
      const path_ = filePath.split(flag1)[1].split('.')[0];

      if (type === 'md') {
        pages.push({
          page: fs.readFileSync(filePath, 'utf-8'),
          path: `${filePath.split(flag1)[1].replace('.md', '.html')}`,
          name: filePath.split(flag2)[1].split('.')[0].split('/').join('-'),
        });
      }

      if (type === 'md' && name !== 'index') {
        filesList.push({
          name,
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
    sidebar[`/${_}/`] = [];

    return _;
  });

  filesList.map((_) => {
    const obj = { text: _.name, link: _.path };
    sidebar[_.dirName].push(obj);

    return _;
  });

  return { nav, pages, sidebar };
};
export const nav = fn().nav;
export const pages = fn().pages;
export const sidebar = fn().sidebar;
