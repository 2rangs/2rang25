<script setup lang="ts">
import { computed } from "vue";

// 현재 경로를 '/'로 나누고 배열로 저장
const path = window.location.pathname.split("/").filter(Boolean);

// Breadcrumb 링크 생성
const breadcrumbLinks = computed(() => {
  const links = path.map((segment, index) => {
    const pathTo = "/" + path.slice(0, index + 1).join("/");
    return { label: segment.replaceAll('-',' '), to: pathTo };
  });
  return [{ label: "Home", to: "/" }, ...links];
});
</script>

<template>
  <UBreadcrumb
      class="p-3"
      divider="/"
      :links="breadcrumbLinks"
  />
</template>
