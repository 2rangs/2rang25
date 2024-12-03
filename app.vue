<template>
<NuxtLoadingIndicator :throttle="100"  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
console.log('initialize 2rang25!')
// window.localStorage.clear()
// 외부 스크립트 추가
useHead({
  script: [
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5843730547937550",
      async: true,
      crossorigin: "anonymous"
    }
    ]
})
</script>

<style>
body {
  font-family: 'NanumSquareNeo-reqular';
}
</style>