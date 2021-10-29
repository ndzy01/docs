<script setup>
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import { ref } from 'vue';

const { Layout } = DefaultTheme;
const pages = useData().theme.value.pages || [];
let v = ref('');
let list = ref([]);

const search = () => {
  if (v.value) {
    const reg = new RegExp('(.{0,40})' + v.value + '(.{0,40})', 'gu');
    const _List = pages
      .map((_) => {
        const flag = _.page.match(reg);

        if (flag) {
          return {
            path: _.path,
            name: _.name,
            list: flag,
          };
        }

        return flag;
      })
      .filter((_) => _);

    list.value = _List;
  }
};
const cancel = () => {
  list.value = [];
};
</script>

<template>
  <Layout>
    <template #navbar-search>
      <div class="search">
        <input v-model="v" />
        <button @click="search">搜索</button>
        <button @click="cancel">取消</button>
        <div class="list">
          <div v-for="item in list" :key="item.path">
            <a :href="item.path">{{ item.name }}</a>
            <div class="list-detail">
              <ol>
                <li v-for="(l2, index) in item.list" :key="index" v-html="l2" />
              </ol>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.search {
  padding: 8px;
}

.list {
  position: absolute;
  top: 60px;
}

.list-detail {
  margin-left: 16px;
  font-size: 8px;
}

.list-detail ol {
  margin: 0;
}
</style>
