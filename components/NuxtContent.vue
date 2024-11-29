<template>
  <div class="flex">
    <UPageGrid class="m-auto p-5">
      <UBlogPost
          v-for="post in posts"
          :key="post.id"
          class="cursor-pointer"
          :badge="{ label: getCategoryName(post.category_id), size: 'md', color: 'blue', variant: 'outline'}"
          :title="post.title"
          :image="post.thumbnail"
          :description="post.summary"
          :authors="[{ name: '2rang25', avatar: { alt: 'Avatar', size: 'sm', src: 'https://i.pinimg.com/736x/87/42/4a/87424a515a402f676ed07c382f28972b.jpg' } }]"
          :date="post.created_at"
          :to="`/posts/${post.id}/${generateSlug(post.title)}`"
      />
    </UPageGrid>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

// props 정의
const props = defineProps<{
  posts: Array<{
    id: number;
    title: string;
    thumbnail: string;
    summary: string;
    category_id: number;
    created_at: string;
  }>;
}>();

const categories = ref<any[]>([]) // categories 데이터를 배열로 초기화

const route = useRoute();

const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// SEO 설정
useHead({
  titleTemplate: () => {
    return `2rang25 - ${props.page?.toLowerCase()}`;
  },
  meta: computed(() => {
    if (!props.page?.toLowerCase()) return [];
    return [
      {
        property: 'og:title',
        content: `2rang25's ${props.page?.toLowerCase()}`,
      },
      {
        property: 'og:description',
        content: `2rang25's ${props.page?.toLowerCase()} 페이지 입니다.`,
      },
      {
        property: 'og:image',
        content: 'https://i.pinimg.com/564x/f6/d0/0a/f6d00a247fa38686475a7cbf6b1a641d.jpg',
      },
    ];
  }),
});

// 카테고리 이름 가져오기
const getCategoryName = (id: number) => {
  const category = categories.value.find(cat => cat.id === id);
  return category ? category.name : 'Uncategorized';
};

// API 호출
onMounted(async () => {
  categories.value = await getCategories();
  localStorage.setItem('categories', JSON.stringify(categories.value));
});
</script>
