<template>
<main-layout>
  <div class="min-h-screen  p-6 cursor-pointer">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-5xl bold mb-6 text-center ">Projects</h1>
      <h1 class="text-center">주인장의 놀이터 입니다.</h1>
      <div class="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  px-4 py-8">
        <div
            v-for="project in projects"
            :key="project.id"
            @click="navigateToProject(project.idx)"
            class=" p-3 rounded-lg shadow-lg flex flex-col"
            style="background: #232323"
        >
          <div class="flex-shrink-0">
            <img :src="project.thumbnails" class="w-full h-48 object-cover rounded-t-lg" alt="Thumbnail"/>
          </div>
          <div class="flex-grow mt-4 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-bold mb-2 "> {{`[ ${project.category.name} ] ${ truncateString(project.title, 20)}`}}</h3>
              <p class="mt-2">{{ truncateString(project.content, 70) }}</p>
            </div>
            <p class=" text-sm text-right">{{ new Date(project.created_at).toLocaleDateString() }}</p>
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