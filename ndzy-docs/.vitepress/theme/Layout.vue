<script setup>
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #navbar-search>
      <div />
    </template>
    <template #sidebar-top>
      <Date />
    </template>
  </Layout>
</template>
