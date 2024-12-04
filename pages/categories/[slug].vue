<template>
  <MainLayout>
    <template #category >
      <UAside>
        <NuxtCategory />
      </UAside>
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
import {useNavigationTree} from "~/composables/useCategoryTree";
import MainLayout from "~/layouts/MainLayout.vue";
import {getPostByCategory} from "~/utils/api";
import {getCategoryInfo} from "~/utils/commons";
const categories = ref()
const route = useRoute()
const categoryInfo = ref()
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