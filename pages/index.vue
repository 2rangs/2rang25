<template>
  <MainLayout>
    <div id="main">
      <div id="center_info">
        <div class="h-full">
          <img src="/assets/2rang.svg" class="w-96 m-auto" />
        </div>
      </div>
      <div id="card_nav" class="grid gap-6 lg:grid-cols-4 lg:grid-rows-2">
        <UCard class="card cursor-pointer row-span-1 col-span-4 lg:col-span-2 lg:row-span-2" @click="movePage('projects')">
          <span class="font-extrabold text-3xl">Project</span>
        </UCard>
        <UCard class="card cursor-pointer row-span-1 col-span-4 lg:col-span-2 lg:row-span-1" @click="movePage('gallary')">
          <span class="font-extrabold text-3xl">Gallary</span>
        </UCard>
        <UCard class="card cursor-pointer row-span-1 col-span-4 lg:col-span-1" @click="movePage('blogs')">
          <span class="font-extrabold text-3xl">Blogs</span>
        </UCard>
        <UCard class="card cursor-pointer row-span-1 col-span-4 lg:col-span-1" @click="movePage('about')">
          <span class="font-extrabold text-3xl">About</span>
        </UCard>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const movePage = (toPage: string) => {
  router.push(`/${toPage}`);
}
</script>

<style scoped lang="scss">
body {
  background-color: white;
}
span {
  font-family: 'NanumSquareNeo-extrabold';
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#main {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5px;
  min-height: calc(100vh - 50px);
}

#center_info {
  margin: 15px;
  height: 40vh;
}

#card_nav {
  height: 40vh;
  margin: 15px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #E6D4C8; /* Light gray border */
  border-radius: 0.5rem;
  padding: 2rem;
  transition: all 0.4s;

  &:hover {
    background-color: #E6D4C8; /* Darker gray background on hover */
  }


}
</style>
