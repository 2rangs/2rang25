<template>
    <MainLayout>
      <div class="min-h-screen p-2 cursor-pointer">
        <div class="max-w-7xl mx-auto">
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
