<template>
  <ClientOnly>
  <UHeader :links="links" class="opacity-6">
    <template #logo>
      <!-- 로고 -->
      <div id="header_logo" class="text-center lg:text-left mb-4 lg:mb-0">
        <NuxtLink id="home_link" to="/">
        <span class="text-2xl font-bold">
          <span class="text-primary">2</span>
          <span>Rang</span>
          <span class="text-primary">25</span>
        </span>
        </NuxtLink>
      </div>

    </template>

    <template #right>
      <UColorModeToggle class="mr-3" />
    </template>
  </UHeader>
  </ClientOnly>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

const colorMode = useColorMode()
const appConfig = useAppConfig()
// 네비게이션 링크 데이터
const links =[
  { label: "2Rang25", to: "/" },
  { label: "Posts", to: "/posts" },
  { label: "Ai", to: "/ai" },
]

// 테마 색상 리스트
const colors = [
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
  { label: "Amber", value: "amber" },
  { label: "Yellow", value: "yellow" },
  { label: "Lime", value: "lime" },
  { label: "Green", value: "green" },
  { label: "Emerald", value: "emerald" },
  { label: "Teal", value: "teal" },
  { label: "Cyan", value: "cyan" },
  { label: "Sky", value: "sky" },
  { label: "Blue", value: "blue" },
  { label: "Indigo", value: "indigo" },
  { label: "Violet", value: "violet" },
  { label: "Purple", value: "purple" },
  { label: "Fuchsia", value: "fuchsia" },
  { label: "Pink", value: "pink" },
  { label: "Rose", value: "rose" },
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// 테마 색상 업데이트 함수
const updateTheme = (color: string) => {
  if (appConfig.ui) {
    appConfig.ui.primary = color;
  }
};

onMounted( async () => {
  // Integrate random color update
  const randomColor = getRandomColor()
  updateTheme(randomColor.value)

})
</script>

<style scoped>
/* 사이드바 전환 애니메이션 */
aside {
  transition: transform 0.3s ease-in-out;
}
</style>
