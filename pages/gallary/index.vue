<template>
  <main-layout>
    <div class="min-h-screen p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-5xl font-bold mb-6 text-center">Gallery</h1>
        <h1 class="text-center">주인장의 취향이 듬뿍담긴 공간</h1>
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto">
            <div v-for="item in items" :key="item.idx" class="relative bg-gray-800 shadow rounded-lg overflow-hidden group" @click="openModal(item)">
              <img :src="item.url" :alt="item.title" class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"/>
              <div class="absolute inset-0 flex flex-col justify-center items-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black bg-opacity-50">
                <h2 class="text-lg text-white font-bold">{{ item.title }}</h2>
                <p class="text-gray-200 text-sm">By {{ item.created_by }}</p>
                <p class="text-gray-300 text-xs">{{ new Date(item.created_at).toLocaleDateString() }}</p>
              </div>
            </div>
            <div class="relative border-gray-500 border shadow rounded-lg overflow-hidden flex justify-center items-center cursor-pointer" @click="openAddImageModal">
              <span class="text-6xl text-gray-400">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="closeModal">
      <div class="relative rounded-lg p-4 max-w-3xl mx-auto flex flex-col items-center">
        <button class="absolute top-2 right-1 text-white rounded-full w-8 h-8 flex items-center justify-center" @click="closeModal">X</button>
        <img :src="selectedImage.url" :alt="selectedImage.title" class="w-3/5 rounded-lg"/>
        <div class="mt-4 text-center">
          <h2 class="text-2xl font-bold text-white">{{ selectedImage.title }}</h2>
          <p class="text-gray-200">By {{ selectedImage.created_by }}</p>
          <p class="text-gray-400 text-sm">{{ new Date(selectedImage.created_at).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>

    <div v-if="showAddImageModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="closeAddImageModal">
      <div class="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-center text-white">Add New Image</h2>
        <form @submit.prevent="addImage">
          <div class="mb-4">
            <label class="block text-gray-300">Image URL</label>
            <input v-model="newImage.url" type="text" class="w-full px-3 py-2 border rounded bg-gray-800 text-gray-100" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-300">Title</label>
            <input v-model="newImage.title" type="text" class="w-full px-3 py-2 border rounded bg-gray-800 text-gray-100" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-300">Created By</label>
            <input v-model="newImage.created_by" type="text" class="w-full px-3 py-2 border rounded bg-gray-800 text-gray-100" required>
          </div>
          <div class="text-center">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Image</button>
          </div>
        </form>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MainLayout from '~/layouts/MainLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const items = ref<any[]>([]);
const showModal = ref(false);
const showAddImageModal = ref(false);
const selectedImage = ref<any>(null);
const newImage = ref<{ url: string, title: string, created_by: string }>({
  url: '',
  title: '',
  created_by: ''
});

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    return null;
  }
  return data.user;
}

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

const openModal = (item : any) => {
  selectedImage.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedImage.value = null;
};

const openAddImageModal = async () => {
  const user = await getUser();
  if (!user) {
    router.push('/login');
  } else {
    showAddImageModal.value = true;
  }
};

const closeAddImageModal = async () => {
  showAddImageModal.value = false;
  newImage.value = { url: '', title: '', created_by: '' }
  items.value = await getItems();
};

const addImage = async () => {
  const { data, error } = await supabase.from('images').insert({
    url: newImage.value.url,
    title: newImage.value.title,
    created_by: newImage.value.created_by
  })

  if (data) {
    items.value = await getItems()
    closeAddImageModal()
  } else {
    console.error(error)
    closeAddImageModal()
  }
};

onMounted(async () => {
  items.value = await getItems();
});
</script>

<style scoped>
/* Additional styling can be defined here if needed */
</style>
