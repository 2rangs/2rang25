<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 p-8">추천 글</h2>
    <UBlogList v-if="surround" orientation="horizontal">
      <UBlogPost
          class="cursor-pointer p-4"
          v-for="item in surround"
          :title="truncateText(item.title, 20)"
          :description="truncateText(item.summary, 20)"
          :image="item.thumbnail"
          :date="dateConvert(item.created_at)"
          :to="`/posts/${generateSlug(item.title)}`"
      />
    </UBlogList>
    <p v-else class="text-gray-500">Surround 데이터를 찾을 수 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '~/utils/supabase';

// Props 정의
const props = defineProps({
  category: Number,
});

const generateSlug = (title: string): string => title.replaceAll(' ', '-');

// 텍스트 자르기 함수
const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const route = useRoute();
const surround = ref();

// Supabase 데이터 요청
onMounted(async () => {
  const { data, error } = await supabase
      .from('posts') // Supabase 테이블 이름
      .select('title, summary, thumbnail, created_at') // 필요한 필드 선택
      .eq('category_id', props.category) // 카테고리 필터
      .order('likes', { ascending: false }) // 좋아요 순 정렬
      .limit(3); // 상위 3개만 가져오기

  if (error) {
    console.error('Supabase Fetch Error:', error.message);
  } else {
    surround.value = data;
  }
});
</script>
<style lang="scss">
* {

}
</style>
