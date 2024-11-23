<template>
 <MainLayout>
    <div class="min-h-screen p-2">
      <div class="max-w-6xl mx-auto">
        <div class="text-center">
          <span class="block italic p-3">
          - 프로젝트를 소개 하는 공간 -
          </span>
        </div>
        <NuxtContent page="Projects" />
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
