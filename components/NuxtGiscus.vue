<template>
  <div class="giscus"></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
const isDark = computed(() => useColorMode().value === "light")
const isTheme = () => {
  return  isDark.value ? "light" : "dark"
}
watch(isDark,() => {
  changeGiscusTheme(isTheme())
})
// Giscus 테마 변경 함수
const changeGiscusTheme = (theme: string) => {
  const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
  if (iframe) {
    iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: `${theme}_tritanopia`,
            },
          },
        },
        "https://giscus.app"
    );
  }
};

// Giscus 초기화
onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "2rangs/2rang25");
  script.setAttribute("data-repo-id", "R_kgDOLZGXSg");
  script.setAttribute("data-category", "Comments");
  script.setAttribute("data-category-id", "DIC_kwDOLZGXSs4Ck1Vx");
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "bottom");
  script.setAttribute("data-theme", isTheme());
  script.setAttribute("data-lang", "ko");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;

  const giscusDiv = document.querySelector(".giscus");
  if (giscusDiv) {
    giscusDiv.appendChild(script);
  }
});

// `storage` 이벤트 감지 및 Giscus 테마 변경
// onMounted(() => {
//   const handleStorageChange = (event: StorageEvent) => {
//     if (event.key === "theme" && event.newValue) {
//       changeGiscusTheme(event.newValue);
//     }
//   };
//
//   window.addEventListener("storage", handleStorageChange);
//   return () => {
//     window.removeEventListener("storage", handleStorageChange);
//   };
// });
</script>

<style scoped>
.giscus {
  margin-top: 20px;
}
</style>

<!--<template>-->
<!--  <div class="giscus"></div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { onMounted } from "vue"-->

<!--const isDark = computed(() => useColorMode().value === "dark")-->
<!--const isTheme = () => {-->
<!--  return  isDark.value ? "light" : "dark"-->
<!--}-->
<!--watch(isDark,() => {-->
<!--  console.log(isTheme())-->
<!--})-->
<!--const script = document.createElement("script")-->
<!--const setGiscus = () => {-->
<!--  script.src = "https://giscus.app/client.js"-->
<!--  script.setAttribute("data-repo", "2rangs/2rang25")-->
<!--  script.setAttribute("data-repo-id", "R_kgDOLZGXSg")-->
<!--  script.setAttribute("data-category", "Comments")-->
<!--  script.setAttribute("data-category-id", "DIC_kwDOLZGXSs4Ck1Vx")-->
<!--  script.setAttribute("data-mapping", "pathname")-->
<!--  script.setAttribute("data-strict", "0")-->
<!--  script.setAttribute("data-reactions-enabled", "1")-->
<!--  script.setAttribute("data-emit-metadata", "0")-->
<!--  script.setAttribute("data-input-position", "bottom")-->
<!--  script.setAttribute("data-theme", `noborder_${isTheme}`)-->
<!--  script.setAttribute("data-lang", "ko")-->
<!--  script.setAttribute("crossorigin", "anonymous")-->
<!--  script.async = true-->
<!--}-->
<!--onMounted(() => {-->
<!--  setGiscus()-->
<!--  const giscusDiv = document.querySelector(".giscus")-->
<!--  if (giscusDiv) {-->
<!--    giscusDiv.appendChild(script)-->
<!--  } else {-->
<!--    console.error("GiscusComment div not found!")-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 필요 시 스타일 추가 */-->
<!--.GiscusComment {-->
<!--  margin-top: 20px-->
<!--}-->
<!--</style>-->
