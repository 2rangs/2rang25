<template>
  <ClientOnly>
  <UHeader :links="links">
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
      <UColorModeButton />
      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost" />
    </template>
  </UHeader>
  </ClientOnly>
</template>

<script setup lang="ts">
// Color mode와 appConfig 상태 관리
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";

const colorMode = useColorMode();
const appConfig = useAppConfig();

// 네비게이션 링크 데이터
const links = [
  { label: "2Rang25", to: "/" },
  { label: "Posts", to: "/posts" },
  { label: "Gallery", to: "/gallery" },
];

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

// 다크 모드 상태
const isDark = computed(() => colorMode.value === "dark");

// 다크 모드 토글 함수
const toggleDarkMode = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};

// 테마 색상 업데이트 함수
const updateTheme = (color: string) => {
  if (appConfig.ui) {
    appConfig.ui.primary = color;
  }
};

// 사이드바 상태 관리
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
/* 사이드바 전환 애니메이션 */
aside {
  transition: transform 0.3s ease-in-out;
}
</style>
