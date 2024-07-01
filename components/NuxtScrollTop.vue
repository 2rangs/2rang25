<template>
  <button
      v-show="isVisible"
      @click="scrollToTop"
      class="scroll-to-top fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300"
      aria-label="Scroll to top"
  >
    ⬆
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  // 300px 이상 스크롤 시 버튼 표시
  isVisible.value = window.scrollY > 10;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 부드러운 스크롤
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-to-top {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  right: 5vw;
  bottom: 4vh;
}
</style>
