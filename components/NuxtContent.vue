<template>
  <div class="flex mt-10 max-w-4xl p-2 mb-16">
    <UPageGrid class="w-screen m-auto" v-if="posts.length">
      <UBlogPost
          v-for="post in posts"
          :key="post.id"
          class="cursor-pointer"
          :title="post.title"
          :badge="{ label: post.category.name , size: 'md', color: 'primary', variant: 'outline'}"
          :image="post.thumbnail"
          :description="post.summary"
          :date="dateConvert(post.created_at)"
          :to="`/posts/${generateSlug(post.title)}`"
      />
    </UPageGrid>
    <div v-else class="w-full">
      <span class="block text-center text-gray-600  text-xl p-3">
          데이터를 찾지 못했어요!
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import {useNavigationTree} from "~/composables/useCategoryTree";
import {dateConvert, getCategoryInfo} from "~/utils/commons";


// props 정의
const props = defineProps<{
  posts: Array<{
    id: number;
    category: any;
    title: string;
    thumbnail: string;
    summary: string;
    category_id: number;
    created_at: string;
  }>;
}>()

const categories = ref<any[]>([]) // categories 데이터를 배열로 초기화

const generateSlug = (title: string): string => {
  return title.trim().replaceAll(' ','-')
};

// SEO 설정
useHead({
  title : `2rang25 - 작성글`,
  meta: [
    {
      property: 'og:title',
      content: `작성글 목록`
    }, {
      property: 'og:description',
      content: `안된다, 못한다 하지말고 긍정적으로!`
    }, {
      property: 'og:image',
      content: 'https://media.licdn.com/dms/image/v2/D4D12AQGrErXUNFk7tQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1694683835221?e=2147483647&v=beta&t=9Y30wHLuq9-wcYZkf2miBiXwxWsoswr6ejcetbjbhl8'
    }]
})

// API 호출
onBeforeMount(async () => {
  // if( localStorage.getItem('categories') ) {
  //   categories.value = JSON.parse(localStorage.getItem('categories') as string)
  // } else {
  //   categories.value = await  useNavigationTree(supabase)
  // }
});
</script>
