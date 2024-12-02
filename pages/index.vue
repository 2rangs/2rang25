<template>
  <MainLayout>
    <div id="main" class="w-full mx-auto m-3 min-h-[calc(100vh-50px)]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <!-- Text Section -->
          <div class="flex flex-col items-center md:items-start justify-center">
            <h1 class="text-4xl md:text-6xl p-3 font-bold text-center md:text-left"><b class="text-primary">K</b>im <b class="text-primary">Y</b>i <b class="text-primary">R</b>ang</h1>

            <h2 class="text-2xl md:text-4xl p-3 font-bold text-center md:text-left">개인 기술 블로그 💫</h2>
            <p class="text-md  p-3 text-center md:text-left italic opacity-80">안된다, 못한다 하지말고 어떻게?? 긍정적으로!!!!</p>
          </div>
          <div class="flex justify-center md:justify-start">
            <div class="container mx-auto">
              <!-- Row 1 -->
              <div class="flex gap-3 mb-3 scale-130">
                <div class="bg-primary-500 text-white px-3 py-4 rounded-full font-bold text-center w-full">2rang25</div>
                <div class="bg-primary-700 text-white px-3 py-4 rounded-full font-bold text-center w-full">SSR</div>
                <div class="bg-primary text-white px-3 py-4 rounded-full font-bold text-center w-full un">kt wiz</div>
              </div>
              <!-- Row 2 -->
              <div class="flex gap-3 mb-3 scale-130">
                <div class="bg-primary text-white px-3 py-4 rounded-full font-bold text-center w-full">Stacks</div>
                <div class="bg-primary-600 text-white px-3 py-4 rounded-full font-bold text-center w-full">tailwindcss</div>
              </div>
              <!-- Row 3 -->
              <div class="flex gap-3 mb-3 scale-130">
                <div class="bg-primary-800 text-white px-3 py-4 rounded-full font-bold text-center w-full">Supabase</div>
                <div class="bg-primary text-white px-3 py-4 rounded-full font-bold text-center w-full">TypeScript</div>
                <div class="bg-primary-500 text-white px-3 py-4 rounded-full font-bold text-center w-full">Sass</div>
              </div>
              <!-- Row 4 -->
              <div class="flex gap-3 mb-3 scale-130">
                <div class="bg-primary-100 text-gray-800 px-3 py-4 rounded-full font-bold text-center w-full">Nuxt3</div>
                <div class="bg-primary-200 text-gray-800 px-3 py-4 rounded-full font-bold text-center w-full">Pinia</div>
                <div class="bg-primary-100 text-gray-800 px-3 py-4 rounded-full font-bold text-center w-full">Vue3</div>
                <div class="bg-primary-400 text-gray-800 px-3 py-4 rounded-full font-bold text-center w-full">→</div>
              </div>
            </div>

          </div>
        </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue'
useHead({
  title : `2rang25 `,
  meta: [
    {
      property: 'og:title',
      content: `김이랑의 블로그`
    }, {
      property: 'og:description',
      content: `안된다, 못한다 하지말고 긍정적으로!`
    }, {
      property: 'og:image',
      content: 'https://i.pinimg.com/564x/22/45/7c/22457c17f09fc866d3c27fd9a999e350.jpg'
    }]
})
</script>

<style scoped>
</style>
