<template>
  <MainLayout>
    <template #category >
        <NuxtCategory />
    </template>
    <span  class="block text-center m-auto text-5xl italic mt-10">
          {{decodeURIComponent(route.fullPath.split('/')[2])}}
    </span>
    <NuxtContent v-if="posts" :posts="posts" />
    <div v-else class="block mt-10  p-3 mb-16 text-center">
      Loading...
    </div>
  </MainLayout>
</template>
<script setup lang="ts">
import MainLayout from "~/layouts/MainLayout.vue";
import {getPostByCategory} from "~/utils/api";
const categories = ref()
const route = useRoute()
const posts = ref()
const title = decodeURIComponent(route.fullPath.split('/')[2])
useSeoMeta({
  title : `2rang25 - ${title}`,
  ogTitle: `2rang25 - ${title}`,
  description: `${title} 카테고리에요~!`,
  ogDescription: `${title} 카테고리에요~!`,
  ogImage: `https://i.pinimg.com/236x/b8/27/0c/b8270c5820a26880d8e83e4d3fb5e7bd.jpg`
})
const findNodeByName = async (categories: any[], name: string) => {
  for (const node of categories) {
    if (node.title?.split(' (')[0] === name) {
      return node; // 일치하는 노드 반환
    }

    if (node.children && node.children.length > 0) {
      const foundNode : any = await findNodeByName(node.children, name); // 재귀 호출로 자식 탐색
      if (foundNode) {
        return foundNode; // 자식에서 찾은 노드 반환
      }
    }
  }
  return null; // 찾지 못한 경우 null 반환
};

onMounted(async () => {
  categories.value = JSON.parse(localStorage.getItem('categories') as string)
  const result = await findNodeByName(categories.value, title)
  posts.value = await getPostByCategory(result._id)
})

</script>
<style lang="scss">
* {

}
</style>