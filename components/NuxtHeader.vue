<template>
  <header class="p-4">
    <div class="flex justify-between items-center max-w-7xl w-full m-auto">
      <!-- 로고 -->
      <div class="text-2xl font-bold">
        <a href="/">
          <span class="text-primary">2</span>Rang<span class="text-primary">25</span>
        </a>
      </div>

      <!-- 네비게이션 메뉴 -->
      <nav>
        <ul class="flex space-x-6">
          <li v-for="link in links" :key="link.label">
            <a :href="link.to" class="hover:text-primary transition duration-200">{{ link.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// 네비게이션 링크 데이터
const links = [
  { label: "Home", to: "/" },
  { label: "Posts", to: "/posts" },
  { label: "Ai", to: "/ai" },
]

// Nuxt 3의 useColorMode 사용
const colorMode = useColorMode()

// 시스템 모드로 설정
colorMode.preference = "system"
</script>

<style scoped>
/* TailwindCSS의 유틸리티로 스타일을 관리하므로 별도의 정의는 최소화 */
</style>
