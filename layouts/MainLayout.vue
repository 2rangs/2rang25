<template>
  <div class="flex flex-col min-h-screen">
    <!-- 상단 헤더 -->
    <NuxtHeader />

    <!-- 메인 컨텐츠 영역 -->
    <main class="flex flex-grow max-w-7xl w-full m-auto">
      <!-- 좌측 카테고리 -->
      <aside class="hidden lg:block w-1/4 dark:border-gray-700 p-2 mt-24">
        <slot name="category"></slot>
      </aside>

      <!-- 중앙 콘텐츠 -->
      <section class="max-w-7xl w-full">
        <slot />
      </section>

      <!-- 우측 공백 -->
      <aside class="hidden lg:block w-1/4 dark:border-gray-700 p-2">
        <slot name="toc"></slot>
      </aside>
    </main>

    <!-- 하단 푸터 -->
    <NuxtFooter class="mt-auto" />
    <NuxtScrollTop />
  </div>
</template>

<script setup lang="ts">
import NuxtFooter from '~/components/NuxtFooter.vue';
import NuxtHeader from '~/components/NuxtHeader.vue';
</script>

<style scoped>
/* 전체 레이아웃을 화면 전체 높이에 맞춤 */
.flex-grow {
  flex-grow: 1;
}

main {
  flex: 1;
}
</style>
