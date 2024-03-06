<template>

<header>
<div id="header_logo">
    <NuxtLink id="home_link" to="/">2Rang25</NuxtLink>
</div>
<nav>
  <NuxtLink class="page_link" to="/blog">Blog</NuxtLink>
  <NuxtLink class="page_link" to="/project">Project</NuxtLink>
  <NuxtLink class="page_link" to="/about">About</NuxtLink>
  <div id="theme">
      <ClientOnly>
        <UToggle
            v-model="themeToggle"
            size="xl"
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
const colorMode = useColorMode()
const themeToggle = ref(true)
const isDark = computed({
  get () {
    return colorMode.value === 'light'
  },
  set () {
    colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
  }
})

</script>
<style scoped lang="scss">
    header{
        font-family: 'NanumSquareNeo-extrabold';
        max-width: 1200px;
        width: 95%;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        #header_logo{
            font-size: 1.5rem;
            line-height: 60px;
            text-align: center;
            width: 50%;
            max-width: 150px;
        }
        nav {
            width: 60%;
            max-width: 500px;
            display: flex;
            text-align: center;
            line-height: 60px;
            .page_link {
                font-size: 1rem;
                display: block;
                width: 30%;
                max-width: 200px;
            }
        }
    }
    #theme{
    line-height: 75px;
    }

</style>