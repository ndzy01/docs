const fs = require('fs');
const path = require('path');
const docsRoot = path.join(__dirname, '.', 'docs');

function readFileList(
  dir = docsRoot,
  filesList = [],
  dirList = [],
  dirName = '',
) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && item !== '.vitepress') {
      readFileList(path.join(dir, item), filesList, dirList, item);
      dirList.push(item);
    } else {
      const fileNameArr = path.basename(filePath).split('.');
      const name = fileNameArr[0];
      const type = fileNameArr[1];
      const path_ = filePath.split('/docs/docs')[1].split('.')[0];

      if (type === 'md' && name !== 'index') {
        filesList.push({
          name,
          dirName: `/${dirName}/`,
          path: path_,
        });
      }
    }
  });
  return { filesList, dirList };
}

const { filesList, dirList } = readFileList();
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

const str = `export const nav = ${JSON.stringify(
  nav,
)};export const sidebar = ${JSON.stringify(sidebar)}`;

fs.writeFileSync('./docs/.vitepress/data.ts', str);

module.exports = readFileList;
