<template>
  <div>
    <div id="comments"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

// GitHub 저장소 및 설정
const repo = "2rangs/blog-comments";
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const theme = computed(() => (isDark.value ? "github-dark" : "github-light"));
const isLoaded = ref(false);

const loadUtterances = () => {
  try {
    const commentsDiv = document.getElementById("comments");
    if (!commentsDiv) {
      console.error("댓글 요소를 찾을 수 없습니다.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "url");
    script.setAttribute("theme", theme.value);
    script.setAttribute("crossorigin", "anonymous");

    commentsDiv.innerHTML = ""; // 기존 내용 제거
    commentsDiv.appendChild(script);
  } catch (error) {
    console.error("Utterances 로드 중 오류 발생:", error);
  }
  isLoaded.value = true;
};

onMounted(() => {
  loadUtterances();
});

watch(theme, (newTheme) => {
  console.log("테마 변경 감지:", newTheme);
  isLoaded.value = false;
  if (isLoaded.value) {
    loadUtterances();
  }
});
</script>
