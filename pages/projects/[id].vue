<template>
  <main-layout>
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-if="project">
          <h1 class="text-4xl font-bold mb-4 text-gray-800">{{ project.title }}</h1>
          <div class="mb-6 text-gray-500 text-sm">
            <span>{{ new Date(project.created_at).toLocaleDateString() }}</span> |
            <span class="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
              {{ project.category.name }}
            </span>
          </div>
          <img :src="project.thumbnails" class="w-full h-auto object-cover mb-6 rounded-lg" alt="Thumbnail"/>
          <p class="text-gray-700 leading-relaxed">{{ project.content }}</p>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useNuxtApp, useError } from '#imports'
import MainLayout from '~/layouts/MainLayout.vue'

interface Project {
  idx: number
  title: string
  content: string
  created_at: string
  thumbnails: string
  category: {
    name: string
  }
}

const route = useRoute()
const { $supabase } = useNuxtApp()
const project = ref()
const loading = ref(true)
const error = ref<string | null>(null)
const nuxtError = useError()

const fetchProject = async () => {
  try {
    const { data, error: fetchError } = await supabase
        .from('projects')
        .select('idx, title, content, created_at, thumbnails, category ( name )')
        .eq('idx', route.params.id)
        .single()

    if (fetchError || !data) {
      throw new Error(fetchError ? fetchError.message : 'Project not found')
    }

    project.value = data
  } catch (err : any) {
    error.value = err.message
    nuxtError({ statusCode: 404, message: 'Project not found' })
  } finally {
    loading.value = false
  }
}

onMounted(fetchProject)
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
