<template>
  <div class="m-auto w-48 h-20 flex justify-between items-center p-4">
    <UTooltip text="이 글이 도움이 되었어요!">
      <!-- 추천 버튼 -->
      <UButton
          variant="outline"
          @click="likePost"
          :label="`추천 ${likes}`"
      />
    </UTooltip>
    <UTooltip text="이 글의 주소를 복사할래요.">
      <!-- 공유 버튼 -->
      <UButton
          variant="outline"
          @click="sharePost"
          label="공유"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {updatePostLike} from "~/utils/api";


const props = defineProps({
  post_id : Number,
  post_like : Number
})
// 추천 수 상태
const likes = ref<number | undefined>(0);

// 추천 버튼 클릭 핸들러
const likePost = () => {
  if(likes.value){
    likes.value += 1; // 추천 수 증가
    updatePostLike(props.post_id, props.post_like);
  }
};

// 공유 버튼 클릭 핸들러
const sharePost = async () => {
  const postUrl = window.location.href; // 현재 페이지의 URL
  try {
    await navigator.clipboard.writeText(postUrl); // URL 클립보드에 복사
  } catch (err) {
    console.error("클립보드 복사 실패:", err);
  }
}

onMounted(() => {
  likes.value = props.post_like

})
</script>

<style scoped>
/* 버튼 스타일 */
button {
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}
</style>
