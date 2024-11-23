<template>
    <MainLayout>
      <div class="min-h-screen p-2 cursor-pointer">
        <div class="max-w-7xl mx-auto">
          <div class="text-center">
          <span class="block italic p-3">
          - 내맘대로 블로그 -
          </span>
          </div>
          <NuxtContent page="Blogs" />
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
