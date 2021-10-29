<script setup>
import DefaultTheme from 'vitepress/theme';
import lunr from 'lunr';
import { useData } from 'vitepress';
import { ref } from 'vue';

const { Layout } = DefaultTheme;
const pages = useData().theme.value.pages || [];
const idx = lunr(function () {
  this.ref('path');
  this.field('page');

  pages.forEach(function (doc) {
    this.add(doc);
  }, this);
});
let v = ref('');
let list = ref([]);

const search = () => {
  const reg = new RegExp(v.value, 'g');
  const r = idx.search('*' + v.value + '*');
  console.log('r', r);
  const _List = pages.filter((_) => _.page.match(reg));

  list.value = _List;
};
const focus = () => {
  list.value = [];
};
</script>

<template>
  <Layout>
    <template #navbar-search>
      <div class="search">
        <input v-model="v" @focus="focus" />
        <button @click="search">搜索</button>
        <div class="list">
          <div v-for="item in list" :key="item.path">
            <a :href="item.path">{{ item.name }}</a>
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
</style>
