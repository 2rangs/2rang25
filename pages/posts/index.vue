<template>
  <MainLayout :key="$route.fullPath">
    <template #category>
      <NuxtCategory />
    </template>
    <span class="block text-center m-auto text-5xl italic mt-10">
      {{ route.fullPath.split('/')[1] }}
    </span>
    <NuxtContent :posts="posts" />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '#imports'
import { useAsyncData } from '#imports'
import NuxtCategory from '~/components/NuxtCategory.vue'
import NuxtContent from '~/components/NuxtContent.vue'

const route = useRoute()

// 백 네비게이션 시 강제 초기화를 위해 route.fullPath를 활용한 key 부여
const { data: posts, error } = await useAsyncData('posts', () => {
  return getPosts()
})

useSeoMeta({
  title: `2rang25 - 작성글 목록`,
  ogTitle: `2rang25 - 작성글 목록`,
  description: `주인장의 글 목록`,
  ogDescription: `주인장의 글 목록`,
  ogImage: `https://i.pinimg.com/736x/26/1e/82/261e827cfe417e2f369f2be490cd2eb7.jpg`
})
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
