import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
  server: {
    fs: {
      allow: [
        // 搜索工作区的根目录
        searchForWorkspaceRoot(process.cwd()),
      ],
    },
  },
});
