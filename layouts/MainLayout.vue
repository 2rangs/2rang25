<template>
  <div class="flex flex-col min-h-screen">
    <!-- 상단 헤더 -->
    <header class="w-full">
      <NuxtHeader />
    </header>

    <!-- 메인 컨텐츠 영역 -->
    <main class="flex max-w-7xl w-full m-auto">
      <!-- 좌측 카테고리 -->
      <aside class="hidden lg:block w-1/4 dark:border-gray-700 p-5">
        <UAside>
          <NuxtCategory />
        </UAside>
      </aside>

      <!-- 중앙 콘텐츠 -->
      <section class="max-w-7xl w-full">
        <slot />
      </section>

      <!-- 우측 공백 -->
      <aside class="hidden lg:block w-1/4 dark:border-gray-700 p-5">
        <slot name="toc"></slot>
      </aside>
    </main>

    <!-- 하단 푸터 -->
    <footer class="w-full dark:bg-gray-900">
      <NuxtFooter />
    </footer>
    <NuxtScrollTop />
  </div>
</template>
<script setup lang="ts">
import NuxtFooter from '~/components/NuxtFooter.vue';
import NuxtHeader from '~/components/NuxtHeader.vue';
</script>
<style scoped lang="scss">
#wrapper {
  margin: 5px;
}
</style>