<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
// 외부 스크립트 추가
useHead({
  titleTemplate: () => {
    return '2rang25';
  },
  script: [
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5843730547937550",
      async: true,
      crossorigin: "anonymous"
    },
    {
      src: "https://d-collect.jennifersoft.com/2314da4e/demian.js",
      async: true,
      crossorigin: "anonymous"
    },
    {
      innerHTML: `(function(j, ennifer) {
                     j['dmndata'] = [];
                     j['jenniferFront'] = function(args) { window.dmndata.push(args) };
                     j['dmnaid'] = ennifer;
                     j['dmnatime'] = new Date();
                     j['dmnanocookie'] = false;
                     j['dmnajennifer'] = 'JENNIFER_FRONT@INTG';
                   }(window, '2314da4e'));`,
      type: 'text/javascript'
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'your-script-id': ['innerHTML'] as any
  }
})
</script>

<style>
body {
  font-family: 'NanumSquareNeo-reqular';
}
</style>