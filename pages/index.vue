<template>
  <MainLayout>
    <div id="main" class="container mx-auto mt-5 min-h-[calc(100vh-50px)] bg-white">
      <div id="center_info" class="flex flex-col lg:flex-row items-center justify-between p-4 rounded-lg shadow-lg">
        <img src="/assets/2rang.svg" class="w-64 mb-4 lg:mb-0 lg:w-96" />
        <div class="tech-stack w-full lg:ml-8">
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <li v-for="tech in techStack" :key="tech.name" class="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
              <img :src="tech.image" :alt="tech.name" class="w-12 h-12 mb-3" />
              <div class="tech-name mb-2 font-semibold text-gray-700">{{ tech.name }}</div>
              <div class="progress-bar w-full bg-gray-300 rounded h-3">
                <div class="progress h-full rounded progress-animation" :class="tech.color" :style="{ width: tech.level + '%' }"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div id="card_nav" class="grid gap-6 lg:grid-cols-4 lg:grid-rows-2 mt-8">
        <UCard class="card cursor-pointer col-span-4 lg:col-span-2 lg:row-span-2 flex items-center justify-center p-8 border-2 border-[#E6D4C8] rounded-lg transition-all duration-400 hover:bg-[#E6D4C8] bg-white shadow-md" @click="movePage('projects')">
          <span class="font-extrabold text-3xl text-gray-800">Project</span>
        </UCard>
        <UCard class="card cursor-pointer col-span-4 lg:col-span-2 flex items-center justify-center p-8 border-2 border-[#E6D4C8] rounded-lg transition-all duration-400 hover:bg-[#E6D4C8] bg-white shadow-md" @click="movePage('gallary')">
          <span class="font-extrabold text-3xl text-gray-800">Gallery</span>
        </UCard>
        <UCard class="card cursor-pointer col-span-4 lg:col-span-1 flex items-center justify-center p-8 border-2 border-[#E6D4C8] rounded-lg transition-all duration-400 hover:bg-[#E6D4C8] bg-white shadow-md" @click="movePage('blogs')">
          <span class="font-extrabold text-3xl text-gray-800">Blogs</span>
        </UCard>
        <UCard class="card cursor-pointer col-span-4 lg:col-span-1 flex items-center justify-center p-8 border-2 border-[#E6D4C8] rounded-lg transition-all duration-400 hover:bg-[#E6D4C8] bg-white shadow-md" @click="movePage('about')">
          <span class="font-extrabold text-3xl text-gray-800">About</span>
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
};

const techStack = [
  { name: 'JavaScript', level: 90, color: 'bg-yellow-300', image: '/assets/images/JavaScript.svg' },
  { name: 'TypeScript', level: 85, color: 'bg-blue-500', image: '/assets/images/TypeScript.svg' },
  { name: 'Vue 3', level: 80, color: 'bg-green-500', image: '/assets/images/vue.svg' },
  { name: 'Nuxt 3', level: 75, color: 'bg-green-400', image: '/assets/images/Nuxt3.svg' },
  { name: 'SCSS', level: 70, color: 'bg-pink-500', image: '/assets/images/sass.svg' },
  { name: 'TailwindCss', level: 95, color: 'bg-blue-400', image: '/assets/images/tailwindcss.svg' },
  { name: 'Python', level: 90, color: 'bg-yellow-500', image: '/assets/images/Python.svg' },
  { name: 'Nginx', level: 70, color: 'bg-green-600', image: '/assets/images/nginx.svg' },
  { name: 'AWS', level: 85, color: 'bg-orange-400', image: '/assets/images/aws.svg' },
];
</script>

<style scoped>
@keyframes fillProgress {
  from {
    width: 0;
  }
  to {
    width: var(--progress-width);
  }
}

.progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
}

.progress {
  height: 10px;
  border-radius: 5px;
  --progress-width: 0; /* Default value to avoid animation glitch */
}

.progress-animation {
  animation: fillProgress 2s ease-out forwards;
}

.bg-yellow-300 {
  --progress-width: 90%;
}

.bg-blue-500 {
  --progress-width: 85%;
}

.bg-green-500 {
  --progress-width: 80%;
}

.bg-green-400 {
  --progress-width: 75%;
}

.bg-pink-500 {
  --progress-width: 70%;
}

.bg-blue-400 {
  --progress-width: 95%;
}

.bg-yellow-500 {
  --progress-width: 90%;
}

.bg-green-600 {
  --progress-width: 70%;
}

.bg-orange-400 {
  --progress-width: 85%;
}
</style>
