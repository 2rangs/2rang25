<template>

<header>
<div id="header_logo">
  <NuxtLink  id="home_link" to="/">2Rang25</NuxtLink>
</div>
<nav class="flex">
<div id="navi">
  <NuxtLink id="page_link" to="/projects">Projects</NuxtLink>
  <NuxtLink id="page_link" to="/">Blog</NuxtLink>
  <NuxtLink id="page_link" to="/">Gallary</NuxtLink>
  <NuxtLink id="page_link" to="/">About</NuxtLink>
</div>
</nav>
</header>
</template>
<style scoped lang="scss">
    header{
      font-family: 'NanumSquareNeo-extrabold';
      max-width: 1200px;
      width: 90%;
      margin: 0 auto;
      height: 50px;
      display: flex;
      justify-content: space-between;
        #header_logo{
            font-size: 1.5rem;
            line-height: 50px;
            max-width: 150px;
        }
      #navi {
        font-size: 1rem;
      }

    }
    #page_link{
      margin: 10px;
      line-height: 50px;
    }

</style>
<script setup lang="ts">
</script>