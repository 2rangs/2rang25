<template>
  <div class="flex mt-10 max-w-4xl p-3">
    <UPageGrid class="w-screen m-auto">
      <UBlogPost
          v-for="post in posts"
          :key="post.id"
          class="cursor-pointer"
          :badge="{ label: getCategoryName(post.category_id), size: 'md', color: 'primary', variant: 'outline'}"
          :title="post.title"
          :image="post.thumbnail"
          :description="post.summary"
          :authors="[{ name: '2rang25', avatar: { alt: 'Avatar', size: 'sm', src: 'https://i.pinimg.com/736x/1d/f3/75/1df375151d21a9bb8a1fc48bc836b9a5.jpg' } }]"
          :date="dateConvert(post.created_at)"
          :to="`/posts/${generateSlug(post.title)}`"
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
const dateConvert = (date: string) => {
  const newDate =  new Date(date)
  return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
}

// SEO 설정
useHead({
  titleTemplate: () => {
    return `2rang25 - ${route.fullPath.split('/')[1]}`;
  },
  meta: computed(() => {
    if (route.fullPath.split('/')[1]) return [];
    return [
      {
        property: 'og:title',
        content: `2rang25's ${route.fullPath.split('/')[1]}`,
      },
      {
        property: 'og:description',
        content: `2rang25's ${route.fullPath.split('/')[1]} 페이지 입니다.`,
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
