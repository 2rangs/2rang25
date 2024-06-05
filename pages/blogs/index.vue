<template>
<main-layout>
  <div class="min-h-screen p-6 cursor-pointer">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-5xl font-bold mb-6 text-center">Blogs</h1>
      <h1 class="text-center">주인장의 일상을 공유하는 공간이에요.</h1>
      <div class="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 py-8">
        <div
            v-for="blog in blogs"
            :key="blog.id"
            @click="navigateToProject(blog.idx)"
            class=" p-3 rounded-lg shadow-md flex flex-col"
        >
          <div class="flex-shrink-0">
            <img :src="blog.thumbnails" class="w-full h-48 object-cover rounded-t-lg" alt="Thumbnail"/>
          </div>
          <div class="flex-grow mt-4 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-bold mb-2 "> {{`[ ${blog.category.name} ] ${ truncateString(blog.title, 20)}`}}</h3>
              <p class=" mt-2">{{ truncateString(blog.content, 70) }}</p>
            </div>
            <p class="text-sm text-right">{{ new Date(blog.created_at).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main-layout>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MainLayout from "~/layouts/MainLayout.vue";

const router = useRouter()

const blogs = ref()

const getTodos = async () => {
  const { data, error } = await supabase.from('blogs').select(`
      idx,
      title,
      content,
      created_at,
      thumbnails,
      category ( idx, name, color )
    `)
  blogs.value = data
}
const truncateString = (text : string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength) + '...'
}
const navigateToProject = (id: number) => {
  router.push(`/blogs/${id}`)
}
onMounted(() => {
  getTodos()
})

</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>