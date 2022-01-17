<script setup>
import { useData } from 'vitepress';
import { ref } from 'vue';

const pages = useData().theme.value.pages || [];
const v = ref('');
const list = ref([]);

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
  v.value = '';
};
</script>

<template>
  <div class="search">
    <div class="flex">
      <input class="block" v-model="v" />
      <button class="block" @click="search">搜索</button>
      <button class="block" @click="cancel">取消</button>
    </div>
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

<style scoped>
.search {
  padding: 8px;
  min-width: 300px;
}

.flex {
  display: flex;
}

.block {
  display: inline-block;
}

.list {
  position: relative;
  max-width: 300px;
  overflow: auto;
  max-height: calc(100vh - 60px);
}

.list-detail {
  padding: 2px 16px;
  font-size: 14px;
}

.list-detail ol {
  margin: 0;
}
</style>
