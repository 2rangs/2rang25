<template>
  <header class="max-w-7xl mx-auto flex justify-between items-center p-4">
    <div id="header_logo">
      <NuxtLink id="home_link" to="/">2Rang25</NuxtLink>
    </div>
    <nav class="flex items-center">
      <div id="navi" :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}" class="bg-gray-800 fixed inset-y-0 left-0 w-64 shadow-lg transform transition-transform duration-300 lg:relative lg:flex lg:items-center lg:space-x-6 lg:bg-transparent lg:shadow-none lg:translate-x-0">
        <NuxtLink class="page_link" to="/projects">Projects</NuxtLink>
        <NuxtLink class="page_link" to="/blogs">Blog</NuxtLink>
        <NuxtLink class="page_link" to="/gallary">Gallary</NuxtLink>
        <NuxtLink class="page_link" to="/">About</NuxtLink>
      </div>
      <button class="lg:hidden ml-4" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}

const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<style scoped lang="scss">
header {
  font-family: 'NanumSquareNeo-extrabold';
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #header_logo {
    font-size: 1.5rem;
    line-height: 50px;
    max-width: 150px;
  }

  #navi {
    font-size: 1rem;
  }
}

.page_link {
  @apply block mt-4 lg:inline-block lg:mt-0 mx-2;
}
</style>
