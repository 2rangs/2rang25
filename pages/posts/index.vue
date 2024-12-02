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
       <div v-else class="block mt-10 max-w-4xl p-2 mb-16 h-screen text-center">
              Loading...
       </div>
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
