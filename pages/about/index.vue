
<template>
  <ClientOnly>
    <MainLayout>
      <div class="mt-24">
        <!-- 헤더 섹션 -->
        <div class="flex flex-col items-center justify-center py-20">
          <div class="mb-6">
            <a href="https://github.com/2rangs" alt="github let's go!">
              <img
                  src="https://avatars.githubusercontent.com/u/107464775?v=4"
                  alt="김이랑 프로필"
                  class="w-36 h-36 border-4 border-primary  hover:scale-110 transition-transform duration-500 cursor-pointer"
              />
            </a>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-wide mb-2">
            김이랑 (Kim Yi Rang)
          </h1>
          <p class="text-lg md:text-xl font-light italic p-3">
            2003년 | 프론트엔드 엔지니어
          </p>
          <p class="mt-2 text-md text-primary">
            Nuxt 3 · Vue 3 · Tailwind CSS · Flutter · Python
          </p>
          <div class="flex justify-center space-x-4 mt-6">
            <a
                href="https://github.com/2rangs"
                target="_blank"
                class="px-4 py-2 text-primary border border-primary rounded-full shadow-md hover:bg-primary hover:text-white transition"
            >
              GitHub
            </a>
            <a
                href="https://github.com/2rangs/2rang25"
                target="_blank"
                class="px-4 py-2 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark transition"
            >
             2rang25 블로그 레포지터리
            </a>
          </div>
        </div>

        <!-- 기술 스택 섹션 -->
<!--        <div class="py-16 bg-white">-->
<!--          <h2 class="text-3xl md:text-4xl font-semibold text-center mb-8 text-primary-dark">-->
<!--            기술 스택-->
<!--          </h2>-->
<!--          <div class="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 px-8">-->
<!--            <div class="flex flex-col items-center">-->
<!--              <UIcon name="nuxt" size="lg" class="text-primary mb-3" />-->
<!--              <span class="text-primary text-lg font-medium">Nuxt 3</span>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center">-->
<!--              <UIcon name="vue" size="lg" class="text-green-500 mb-3" />-->
<!--              <span class="text-green-500 text-lg font-medium">Vue 3</span>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center">-->
<!--              <UIcon name="tailwind" size="lg" class="text-blue-400 mb-3" />-->
<!--              <span class="text-blue-400 text-lg font-medium">Tailwind CSS</span>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center">-->
<!--              <UIcon name="flutter" size="lg" class="text-teal-400 mb-3" />-->
<!--              <span class="text-teal-400 text-lg font-medium">Flutter</span>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center">-->
<!--              <UIcon name="python" size="lg" class="text-yellow-500 mb-3" />-->
<!--              <span class="text-yellow-500 text-lg font-medium">Python</span>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center">-->
<!--              <UIcon name="database" size="lg" class="text-gray-500 mb-3" />-->
<!--              <span class="text-gray-500 text-lg font-medium">MySQL</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </MainLayout>
  </ClientOnly>
</template>
<script setup lang="ts">
import MainLayout from "~/layouts/MainLayout.vue";


useHead({
  title : `2rang25 - About`,
  meta: [
    {
      property: 'og:title',
      content: `2rang25`
    }, {
      property: 'og:description',
      content: `어딜내놓아도 부끄러운 저를 소개합니다.`
    }, {
      property: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/107464775?v=4'
    }]
})
</script>
<style scoped>
/* 추가 애니메이션 */
h1 {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
