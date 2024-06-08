<template>
  <MainLayout>
    <div class="min-h-screen p-6 cursor-pointer">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-5xl font-bold mb-6 text-center">Blogs</h1>
        <h1 class="text-center">주인장의 은밀한 사생활 입니다.</h1>
        <div class="flex justify-center items-center mb-6 space-x-4">
          <select v-model="selectedCategory" class="p-3 border rounded-lg">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.idx" :value="category.name">
              {{ category.name }}
            </option>
          </select>
          <UInput v-model="searchQuery" size="xl"  color="rang" class="p-3 max-w-md w-2/3" placeholder="Search projects..." />
        </div>
        <div class="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 py-8">
          <div
              v-for="blogs in filteredBlogs"
              :key="blogs.id"
              @click="navigateToBlog(blogs.idx)"
              class="p-3 rounded-lg shadow-lg flex flex-col"
          >
            <div class="flex-shrink-0">
              <img :src="blogs.thumbnails" class="w-full h-48 object-cover rounded-t-lg" alt="Thumbnail" />
            </div>
            <div class="flex-grow mt-4 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-bold mb-2"> {{ `[ ${blogs.category.name} ] ${ truncateString(blogs.title, 20) }` }}</h3>
              </div>
              <p class="text-sm text-right">{{ new Date(blogs.created_at).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import MainLayout from '~/layouts/MainLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const blogs = ref<any>([])
const categories = ref<any>([])
const searchQuery = ref('')
const selectedCategory = ref('')

const getProjects = async () => {
  const { data, error } = await supabase.from('blogs').select(`
    idx,
    title,
    content,
    created_at,
    thumbnails,
    category ( idx, name )
  `);
  if (error) {
    console.error(error);
  } else {
    blogs.value = data;
  }
};

const getCategories = async () => {
  const { data, error } = await supabase.from('category').select('idx, name');
  if (error) {
    console.error(error);
  } else {
    categories.value = data;
  }
};

const truncateString = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const navigateToBlog = (id: number) => {
  router.push(`/blogs/${id}`);
};

const filteredBlogs = computed(() => {
  return blogs.value.filter((project : any) => {
    const matchesCategory = selectedCategory.value ? project.category.name === selectedCategory.value : true;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  })
})

onMounted(() => {
  getProjects();
  getCategories();
});
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
