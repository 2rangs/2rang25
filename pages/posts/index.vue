<template>
 <MainLayout>
   <template #category >
     <UAside>
       <NuxtCategory />
     </UAside>
   </template>
   <span class="block text-center m-auto text-5xl italic mt-10">
          {{route.fullPath.split('/')[1]}}
        </span>
        <NuxtContent v-if="posts" :posts="posts"  />
       <div v-else  class="flex mt-10 max-w-7xl w-full p-2 mb-16">
              Loading...
       </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
import {useNavigationTree} from "~/composables/useCategoryTree";
const posts = ref()
const route = useRoute()

useSeoMeta({
  title: `2rang25 - 작성글 목록`,
  ogTitle: `2rang25 - 작성글 목록`,
  description: `주인장의 글 목록`,
  ogDescription: `주인장의 글 목록`,
  ogImage: `https://i.pinimg.com/736x/26/1e/82/261e827cfe417e2f369f2be490cd2eb7.jpg`
})

onBeforeMount(async () => {
  posts.value = await getPosts()
  await useNavigationTree(supabase)
})
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
