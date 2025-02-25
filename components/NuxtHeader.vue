<template>
  <div>
    <!-- 고정 헤더 -->
    <header class=" w-full">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <!-- 로고 -->
        <div>
          <a href="/" class="flex items-center no-underline">
            <span class="text-primary font-bold text-2xl">2</span>
            <span class="mx-2 text-2xl font-medium">Rang</span>
            <span class="text-primary font-bold text-2xl">25</span>
          </a>
        </div>
        <!-- 데스크탑 내비게이션 -->
        <nav class="md:flex space-x-4">
          <a href="/" class=" hover:text-primary font-bold transition-colors">
            Home
          </a>
          <a href="/posts" class=" hover:text-primary font-bold transition-colors">
            Posts
          </a>
        </nav>
        <!-- 우측 컨트롤 -->
        <div class="flex items-center">
          <UColorModeToggle />
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
/* 추가 스타일이 필요하면 여기서 작성 */
</style>
