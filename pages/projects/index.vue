<template>
<client-only>
  <MainLayout>
    <div class="min-h-screen p-2 cursor-pointer">
      <div class="max-w-7xl mx-auto">
        <NuxtContent page="Projects" />
      </div>
    </div>
  </MainLayout>
</client-only>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
