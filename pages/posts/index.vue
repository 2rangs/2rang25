<template>
 <MainLayout>
       <span class="block text-center m-auto text-5xl p-5 italic">
          {{route.fullPath.split('/')[1]}}
        </span>
        <NuxtContent v-if="posts" :posts="posts" />
   <USkeleton v-else />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
const posts = ref()
const route = useRoute()
onMounted(async () => {
  posts.value = await getPosts()
})
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
