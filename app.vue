<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
useHead({
  titleTemplate: () => {
    return '2rang25';
  }
})

const colorMode = useColorMode()


onMounted(() => {
  colorMode.value = 'light'
})
</script>
<style>
body {
  font-family: 'NanumSquareNeo-reqular';
}
</style>