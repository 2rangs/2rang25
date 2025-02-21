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
  }>
}>()

const categories = ref<any[]>([]) // categories 데이터를 배열로 초기화

const generateSlug = (title: string): string => {
  return title.trim().replaceAll(' ','-')
};
</script>
