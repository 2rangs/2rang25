<template>
  <div id="comments" v-if="isLoaded">
    <Script src="https://utteranc.es/client.js"
            :repo="repo"
            issue-term="url"
            :theme="theme"
            crossorigin="anonymous"
            async>
    </Script>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';

const repo = "2rangs/blog-comments";
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
});

const theme = computed(() => isDark.value ? 'github-dark' : 'github-light');
const isLoaded = ref(false);

onMounted(() => {
  isLoaded.value = true; // 스크립트를 로드할 준비가 되었음을 나타냄
});
</script>

<style scoped>
</style>
