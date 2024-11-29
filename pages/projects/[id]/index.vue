<script setup lang="ts">
// 해당 id로 리다이렉트
// id로 제목 구하고 아래 함수로 문자 치환
const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

</script>

<template>

</template>

<style scoped>

</style>