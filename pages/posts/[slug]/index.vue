<template>
  <PostViewer v-if="post" :post="post" />
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { getPostByTitle } from '~/utils/api';

const route = useRoute();
const post = ref(null);
const slug = ref()

onMounted(async () => {
  if (route.fullPath.includes('#')) {
    // 슬러그 추출 (해시 제거)
    slug.value = decodeURIComponent(route.fullPath.split('#')[0].split('?')[0])
        .split('/')[2]
        .replaceAll('-', ' ');
  } else {
    // 슬러그 추출 (해시가 없을 때)
    slug.value = decodeURIComponent(route.fullPath.split('?')[0])
        .split('/')[2]
        .replaceAll('-', ' ');
  }

  // 게시글 데이터 가져오기
  post.value = await getPostByTitle(slug.value);
  useSeoMeta({
  title : `${post.value?.title}`,
  ogTitle: `${post.value?.title}`,
  description: `${post.value?.summary}`,
  ogDescription: `${post.value?.summary}`,
  ogImage: `${post.value?.thumbnail}` })

  // 해시 처리: 해당 해시가 있다면 해당 섹션으로 스크롤 이동
  if (route.hash) {
    nextTick(() => {
      // 해시에서 # 제거 후 CSS.escape 적용
      const hashValue = route.hash.startsWith('#') ? route.hash.slice(1) : route.hash;
      const safeHash = `#${CSS.escape(hashValue)}`; // 안전하게 변환된 선택자
      const targetElement = document.querySelector(safeHash); // DOM 요소 선택
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn('Element not found for hash:', route.hash);
      }
    });
  }
})


</script>