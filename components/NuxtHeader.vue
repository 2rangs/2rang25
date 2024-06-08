<template>
  <header class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center p-4">
    <div id="header_logo" class="text-center lg:text-left mb-4 lg:mb-0">
      <NuxtLink id="home_link" to="/">
        <span class="logo-text">
          <span style="color: #E6D4C8">2</span>
          <span>Rang</span>
          <span style="color: #E6D4C8">25</span>
        </span>
      </NuxtLink>
    </div>
    <nav class="flex flex-col lg:flex-row items-center w-full lg:w-auto">
      <div class="flex flex-wrap justify-center space-x-4 lg:space-x-6">
        <NuxtLink class="page_link" to="/projects">Projects</NuxtLink>
        <NuxtLink class="page_link" to="/blogs">Blog</NuxtLink>
        <NuxtLink class="page_link" to="/gallary">Gallery</NuxtLink>
        <NuxtLink class="page_link" to="/">About</NuxtLink>
      </div>
<!--      <div class="mt-4 lg:mt-0 ml-4 lg:ml-6">-->
<!--        <UButton-->
<!--            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"-->
<!--            color="gray"-->
<!--            variant="ghost"-->
<!--            aria-label="Theme"-->
<!--            @click="isDark = !isDark"-->
<!--        />-->
<!--      </div>-->
    </nav>
  </header>
</template>

<script setup>

const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'light'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'light'
  }
})
</script>

<style scoped lang="scss">
header {
  font-family: 'NanumSquareNeo-extrabold';
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #header_logo {
    font-size: 1.5rem;
    color: var(--text-color);

    .logo-text {
      .text-primary {
        color: var(--primary-color);
      }
    }
  }

  .page_link {
    @apply block mt-4 lg:mt-0 mx-2 lg:mx-0;
    color: var(--text-color);
  }
}

:root {
  --text-color: black;
  --primary-color: #3490dc; // Replace with your primary color
}

.dark {
  --text-color: white;
}
</style>
