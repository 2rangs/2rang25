<template>

<header>
  <UIcon name="i-ph-list-bold" />
<div id="header_logo">
    <NuxtLink id="home_link" to="/">2Rang25</NuxtLink>
</div>
<nav>
  <div id="theme">
      <ClientOnly>
        <UToggle
            v-model="themeToggle"
            size="md"
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
        width: 100%;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        #header_logo{
            font-size: 1.5rem;
            line-height: 50px;
            text-align: center;
            width: 50%;
            max-width: 150px;
        }

    }
    #theme{
    line-height: 50px;
    }

</style>