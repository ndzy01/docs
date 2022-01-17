<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import dayjs from 'dayjs';

const timeId = ref(null);
const date = ref('');

onMounted(() => {
  timeId.value = setInterval(() => {
    date.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }, 1000);
});

onBeforeUnmount(() => {
  if (timeId.value) {
    clearInterval(timeId.value);
  }
});
</script>

<template>
  <div class="container">
    {{ date }}
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style>
