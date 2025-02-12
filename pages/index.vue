<template>
  <client-only>
    <MainLayout>
      <div v-if="user" class="min-h-screen flex flex-col items-center py-12">
        <div class="flex flex-col items-center text-center space-y-8">
          <!-- 프로필 이미지 -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-400 blur-lg opacity-50 group-hover:opacity-70 transition"></div>
            <a
                :href="user.profileLink"
                alt="GitHub Profile"
                class="relative z-10"
            >
              <img
                  :src="user.profileImage"
                  :alt="user.name + ' 프로필'"
                  class="w-40 h-40 border-4 border-primary-300 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              />
            </a>
          </div>
          <h1 class="text-5xl font-extrabold">
            {{ user.name }}
            <span class="text-primary-500">({{ user.englishName }})</span>
          </h1>
          <p class="text-lg italic">
            {{ user.title }}
          </p>
          <p class="text-md text-gray-500 dark:text-gray-200 tracking-wide italic">
            {{ user.skills.join(" · ") }}
          </p>
          <!-- 버튼 -->
          <div class="flex space-x-4">
            <UButton icon="i-grommet-icons-github"   class="px-6 py-2 bg-primary-500 rounded-full shadow hover:bg-primary-600 transition">
              GitHub
            </UButton>
            <UButton  variant="outline" class="px-6 py-2 border border-primary-500 text-primary-500 rounded-full ">
              <template #trailing>
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
              </template>
              <a
                  :href="user.projectLink"
                  target="_blank"
              >
                2rang25 블로그!
              </a>
            </UButton>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="w-full max-w-7xl mt-6 p-3">

          <UDivider label="🚀 나의 기술 스택" size="sm" :ui="{ label: 'text-2xl font-bold' } " strategy="merge"
          />

          <!-- Tech Cards -->
          <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            <div
                v-for="(category, index) in techCategories"
                :key="index"
                class="backdrop-blur-lg rounded-2xl transform transition hover:scale-105"
            >
              <div class="flex items-center space-x-4 mb-4">
                <UIcon :name="category.icon" :class="`w-8 h-8 ${category.iconColor}`" />
                <h3 class="text-2xl font-semibold" :class="category.titleColor">
                  {{ category.title }}
                </h3>
              </div>
              <ul class="space-y-4">
                <li
                    v-for="(item, itemIndex) in category.items"
                    :key="itemIndex"
                    class="flex items-center justify-between"
                >
                  <div class="flex items-center space-x-2">
                    <UIcon :name="item.icon" :class="`w-6 h-6 ${item.color}`" />
                    <span class="text-gray-700 dark:text-gray-300">{{ item.name }}</span>
                  </div>
                  <div class="flex space-x-1">
                    <UIcon
                        class="text-primary"
                        v-for="starIndex in item.rating"
                        :key="starIndex"
                        name="i-heroicons-star-16-solid"

                    ></UIcon>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </client-only>
</template>
<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
// 사용자 정보
const user = {
  name: "김이랑",
  englishName: "Kim Yi Rang",
  title: `${new Date().getFullYear() - 2021}년차 프론트엔드 개발자`,
  profileImage: "https://avatars.githubusercontent.com/u/107464775?v=4",
  profileLink: "https://github.com/2rangs",
  projectLink: "https://github.com/2rangs/2rang25",
  skills: ["Nuxt 3", "Vue 3", "TailwindCSS","TypeScript" , "Python"],
};
// 기술 스택 데이터
const techCategories = [
  {
    title: "Front-End",
    icon: "i-mdi-code-tags",
    iconColor: "text-primary-500",
    titleColor: "text-primary-500",
    items: [
      {name: "HTML / CSS / JS", icon: "i-heroicons-computer-desktop", color: "text-yellow-500", rating: 4},
      {name: "Vue 3", icon: "i-mdi-vuejs", color: "text-green-500", rating: 4},
      {name: "Nuxt 3", icon: "i-mdi-nuxt", color: "text-green-600", rating: 4},
    ],
  },
  {
    title: "Back-End",
    icon: "i-mdi-server-network",
    iconColor: "text-green-500",
    titleColor: "text-green-500",
    items: [
      {name: "Python", icon: "i-mdi-language-python", color: "text-primary-400", rating: 3},
      {name: "FastAPI", icon: "i-mdi-api", color: "text-teal-400", rating: 3},
    ],
  },
  {
    title: "DB & Cloud",
    icon: "i-mdi-cloud-outline",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-500",
    items: [
      {name: "Supabase", icon: "i-mdi-database-search", color: "text-green-400", rating: 4},
      {name: "MySQL", icon: "i-mdi-database-outline", color: "text-orange-500", rating: 3}
    ],
  },
];

useSeoMeta({
  title: `2rang25`,
  ogTitle: `2rang25`,
  description: `내가 만든 개인 블로그!`,
  ogDescription: `내가 만든 개인 블로그!`,
  ogImage: `https://i.pinimg.com/736x/fd/33/c0/fd33c06011597dcfaac9c4f8b4a5fdce.jpg`
})
</script>
<style lang="scss">
* {

}
</style>