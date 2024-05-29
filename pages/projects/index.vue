<template>
<main-layout>
  <div class="min-h-screen bg-gray-100 p-6 cursor-pointer">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-700">Projects</h1>
      <div class="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        <div
            v-for="project in projects"
            :key="project.id"
            @click="navigateToProject(project.idx)"
            class="bg-white p-6 rounded-lg shadow-lg flex flex-col"
        >
          <div class="flex-shrink-0">
            <img :src="project.thumbnails" class="w-full h-48 object-cover rounded-t-lg" alt="Thumbnail"/>
          </div>
          <div class="flex-grow mt-4 flex flex-col justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2 text-gray-800">{{ truncateString(project.title, 20) }}</h2>
              <span class="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                {{ project.category.name }}
              </span>
              <p class="text-gray-600 mt-2">{{ truncateString(project.content, 70) }}</p>
            </div>
            <p class="text-gray-500 text-sm text-right">{{ new Date(project.created_at).toLocaleDateString() }}</p>
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

const projects = ref()

const getTodos = async () => {
  const { data, error } = await supabase.from('projects').select(`
      idx,
      title,
      content,
      created_at,
      thumbnails,
      category ( idx, name )
    `)
  projects.value = data
}
const truncateString = (text : string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength) + '...'
}
const navigateToProject = (id: number) => {
  router.push(`/projects/${id}`)
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
<script setup lang="ts">
</script>