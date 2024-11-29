<template>
  <MainLayout>
    <NuxtContent v-if="posts" :posts="posts" />
  </MainLayout>
</template>
<script setup lang="ts">
import {useNavigationTree} from "~/composables/useCategoryTree";
import MainLayout from "~/layouts/MainLayout.vue";
import {getPostByCategory} from "~/utils/api";
const categories = ref()
const route = useRoute()
const currentCategoryId = ref()
const posts = ref()


onMounted(async () => {
  categories.value = await  useNavigationTree(supabase)
   categories.value.map((category : any) => {
     category.children.map((parents : any) => {
       parents.children.map((child : any) => {
         if (child.title.split(' (')[0] === route.fullPath.split('/')[2]) {
           currentCategoryId.value = child._id
         }
       })
     })
   })
  posts.value = await  getPostByCategory(currentCategoryId.value)
})

</script>