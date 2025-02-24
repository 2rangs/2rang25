<template>
  <header class="bg-gray-900 shadow-md py-4">
    <div class="container mx-auto flex items-center justify-between gap-3 h-[--header-height] px-4">
      <!-- 로고 -->
      <div id="header_logo" class="text-center lg:text-left">
        <a id="home_link" href="/" class="flex-shrink-0 font-bold text-xl text-white flex items-end gap-1.5 no-underline">
          <span class="text-primary">2</span>
          <span>Rang</span>
          <span class="text-primary">25</span>
        </a>
      </div>

      <!-- 네비게이션 링크 -->
      <nav class="hidden lg:flex gap-6">
        <a href="/" class="text-gray-300 hover:text-primary transition-colors">2Rang25</a>
        <a href="/posts" class="text-gray-300 hover:text-primary transition-colors">Posts</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* 헤더 높이 변수 */
:root {
  --header-height: 64px;
}
</style>
