<template>
  <main-layout>
    <div class="min-h-screen p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-center">Gallery</h1>
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto">
            <div v-for="item in items" :key="item.idx" class="relative bg-white shadow rounded-lg overflow-hidden group" @click="openModal(item)">
              <img :src="item.url" :alt="item.title" class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"/>
              <div class="absolute inset-0 flex flex-col justify-center items-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black bg-opacity-50">
                <h2 class="text-lg text-white font-bold">{{ item.title }}</h2>
                <p class="text-gray-200 text-sm">By {{ item.created_by }}</p>
                <p class="text-gray-300 text-xs">{{ new Date(item.created_at).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="closeModal">
      <div class="relative rounded-lg p-4 max-w-3xl mx-auto flex flex-col items-center">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img :src="selectedImage.url" :alt="selectedImage.title" class="w-4/5 object-contain rounded-lg"/>
        <div class="mt-4 text-center">
          <h2 class="text-2xl font-bold">{{ selectedImage.title }}</h2>
          <p class="text-gray-200">By {{ selectedImage.created_by }}</p>
          <p class="text-gray-400 text-sm">{{ new Date(selectedImage.created_at).toLocaleDateString() }}</p>
        </div>
        <div class="fixed inset-y-0 left-4 flex items-center justify-center">
          <button @click="previousImage" class="text-white hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div class="fixed inset-y-0 right-4 flex items-center justify-center">
          <button @click="nextImage" class="text-white hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MainLayout from '~/layouts/MainLayout.vue'

const items = ref<any[]>([]);
const showModal = ref(false);
const selectedImage = ref<any>(null);
const currentIndex = ref<number>(-1);

const getItems = async () => {
  const { data, error } = await supabase.from('images').select(`
    idx,
    title,
    url,
    created_at,
    created_by
  `);

  if (data) {
    return data.map((item, index) => ({ ...item, groupKey: Math.floor(index / 10) }));
  } else {
    console.error(error);
    return [];
  }
};

const openModal = (item) => {
  selectedImage.value = item;
  currentIndex.value = items.value.findIndex(i => i.idx === item.idx);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedImage.value = null;
  currentIndex.value = -1;
};

const nextImage = () => {
  if (currentIndex.value < items.value.length - 1) {
    currentIndex.value += 1;
    selectedImage.value = items.value[currentIndex.value];
  }
};

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
    selectedImage.value = items.value[currentIndex.value];
  }
};

onMounted(async () => {
  items.value = await getItems();
});
</script>

<style scoped>
/* 추가적인 스타일링이 필요하다면 여기서 정의할 수 있습니다. */
</style>
