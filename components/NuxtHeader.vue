<template>

<header>
<div id="header_logo">
    <NuxtLink id="home_link" to="/">2Rang25</NuxtLink>
</div>
<nav class="flex">
<div>
  <NuxtLink id="page_link" to="/project">Project</NuxtLink>
  <NuxtLink id="page_link" to="/blog">Blog</NuxtLink>
  <NuxtLink id="page_link" to="/about">About</NuxtLink>
</div>
  <div id="theme">
      <ClientOnly>
        <UToggle
            v-model="themeToggle"
            size="lg"
            on-icon="i-heroicons-moon-20-solid"
            off-icon="i-heroicons-sun-20-solid"
            aria-label="Theme"
            @click="isDark = !isDark"
        />
      </ClientOnly>
    </div>
</nav>
</header>
</template>
<script setup="setup" lang="ts">
import {useThemeStore} from "~/store/themeStore/themeStore";

const colorMode = useColorMode()
const themeToggle = ref(false)
const isDark = computed({
  get () {
    return colorMode.value === 'light'
  },
  set () {
    colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
  }
})

const themeStore  = useThemeStore()

watch(isDark, () => {
  themeStore.setTheme(colorMode.value)
})

onBeforeMount(() => {
  console.log(themeStore.getTheme)
  if(themeStore.getTheme === 'light'){
    themeToggle.value = false
  }else{
    themeToggle.value = true
  }
  colorMode.preference = colorMode.value = themeStore.getTheme
})

</script>
<style scoped lang="scss">
    header{
        font-family: 'NanumSquareNeo-extrabold';
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
        height: 50px;
        display: flex;
        justify-content: space-between;
        #header_logo{
            font-size: 1.5rem;
            line-height: 50px;
            max-width: 150px;
        }

    }
    #theme{
      margin: 13px;
    }
    #page_link{
      margin: 10px;
      line-height: 50px;
    }

</style>