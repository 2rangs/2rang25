<template>
  <main-layout>
    <div class="min-h-screen p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-5xl font-bold mb-6 text-center">
              <span class="logo-text">
      <span class="text-primary">{{ page[0] }}</span>
      <span>{{ page.substring(1, page.length - 1)}}</span>
      <span class="text-primary">{{ page[page.length - 1] }}</span>
    </span>
        </h1>
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


  </main-layout>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import MainLayout from '~/layouts/MainLayout.vue'
import { useRouter } from 'vue-router'
import {useHead} from "#imports";

const page = 'Gallary'
const router = useRouter()
const items = ref<any[]>([]);
const showModal = ref(false);
const showAddImageModal = ref(false);
const selectedImage = ref<any>(null);
const newImage = ref<{ url: string, title: string, created_by: string }>({
  url: '',
  title: '',
  created_by: '2rang25'
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
  `).order('idx', { ascending: false })

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
useHead({
  titleTemplate: () => {
    return `2rang25 - gallary`
  },
  meta: computed(() => {
    return [
      {
        property: 'og:title',
        content: `2rang25's  gallary`
      },
      {
        property: 'og:description',
        content: '주인장의 취향 모음'
      },
      {
        property: 'og:image',
        content: 'https://i.pinimg.com/564x/21/79/15/2179151c492c743e10b15dca9bec671e.jpg'
      }
    ]
  })
})

onMounted(async () => {
  items.value = await getItems();
});
</script>

<style scoped>
/* Additional styling can be defined here if needed */
</style>
