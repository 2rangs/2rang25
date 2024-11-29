<template>
 <MainLayout>
        <div class="text-center">
          <span class="block italic p-3">
          - 프로젝트를 소개 하는 공간 -
          </span>
        </div>
        <NuxtContent v-if="posts" :posts="posts" />

  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'

const posts = ref()
onMounted(async () => {
  posts.value = await getPosts()
})
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
