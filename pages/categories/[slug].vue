<template>
  <MainLayout>
    <template #category >
      <UAside>
        <NuxtCategory />
      </UAside>
    </template>
    <span class="block text-center m-auto text-5xl italic mt-10">
          {{decodeURIComponent(route.fullPath.split('/')[2])}}
    </span>
    <NuxtContent v-if="posts" :posts="posts" />
    <div v-else class="block mt-10  p-3 mb-16 text-center">
      Loading...
    </div>
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
const title = decodeURIComponent(route.fullPath.split('/')[2])
useHead({
  title : `2rang25 - ${title}`,
  meta: [
    {
      property: 'og:title',
      content: `${title} 글 목록`
    }, {
      property: 'og:description',
      content: `안된다, 못한다 하지말고 긍정적으로!`
    }, {
      property: 'og:image',
      content: 'https://i.pinimg.com/564x/22/45/7c/22457c17f09fc866d3c27fd9a999e350.jpg'
    }]
})

onMounted(async () => {
  categories.value = JSON.parse(localStorage.getItem('categories') as string)
  if(categories.value) {
    categories.value.map((category : any) => {
      category.children.map((parents : any) => {
        parents.children.map((child : any) => {
          if (child.title.split(' (')[0] === decodeURIComponent(route.fullPath.split('/')[2])) {
            currentCategoryId.value = child._id
          }
        })
      })
    })
  }
  posts.value = await  getPostByCategory(currentCategoryId.value)
})

</script>