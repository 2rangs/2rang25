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
  if(route.query) {
    // 슬러그 추출 (해시 제거)
   slug.value = decodeURIComponent(route.fullPath.split('#')[0].split('?')[0]).split('/')[2].replaceAll('-', ' ')
  }else {
    // 슬러그 추출 (해시 제거)
   slug.value = decodeURIComponent(route.fullPath.split('#')[0].split('/')[2]).replaceAll('-', ' ')
  }
  post.value = await getPostByTitle(slug.value);
  // 해시 처리: 해당 해시가 있다면 해당 섹션으로 스크롤 이동
  if (route.hash) {
    // DOM이 업데이트된 후에 스크롤 이동
    nextTick(() => {
      const targetElement = document.querySelector(route.hash);
      if (targetElement) {
        targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  }
});
</script>