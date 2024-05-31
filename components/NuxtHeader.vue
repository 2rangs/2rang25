<template>
  <header class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center p-4">
    <div id="header_logo" class="text-center lg:text-left mb-4 lg:mb-0">
      <NuxtLink id="home_link" to="/">2Rang25</NuxtLink>
    </div>
    <nav class="flex flex-col lg:flex-row items-center w-full lg:w-auto">
      <div class="flex flex-wrap justify-center space-x-4 lg:space-x-6">
        <NuxtLink class="page_link" to="/projects">Projects</NuxtLink>
        <NuxtLink class="page_link" to="/blogs">Blog</NuxtLink>
        <NuxtLink class="page_link" to="/gallary">Gallary</NuxtLink>
        <NuxtLink class="page_link" to="/">About</NuxtLink>
      </div>
    </nav>
  </header>
</template>
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
  }

  .page_link {
    @apply block mt-4 lg:mt-0 mx-2 lg:mx-0;
    color: var(--text-color);
  }
}

:root {
  --text-color: black;
}

.dark {
  --text-color: white;
}
</style>
