<template>
  <main-layout>
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-screen-xl mx-auto bg-white rounded-lg shadow-lg p-3">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-if="project" >
          <div class="relative  h-96 mb-6">
            <img :src="project.thumbnails" class="w-full h-full object-cover rounded-lg shadow-lg image-darken" alt="Thumbnail"/>
            <div class="relative  inset-0 flex flex-col">
              <div class="bottom-0 absolute p-3.5">
                <h1 class="text-4xl font-bold text-white mb-2.5">{{ `[ ${project.category.name} ] ${project.title}` }}</h1>
                <span>{{ new Date(project.created_at).toLocaleDateString() }}</span>
                <span class="ml-3">by {{ project.created_by}}</span>
              </div>
            </div>
          </div>
          <div class="mb-6 text-gray-500 text-sm flex justify-between items-center">
          </div>
          <p class="text-gray-700 leading-relaxed">{{ project.content }}</p>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from '#imports'
import MainLayout from '~/layouts/MainLayout.vue'

const route = useRoute()
const project = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchProject = async () => {
  try {
    const { data, error: fetchError } = await supabase
        .from('projects')
        .select('idx, title, content, created_at, created_by, thumbnails, category ( name )')
        .eq('idx', route.params.id)
        .single()

    if (fetchError || !data) {
      throw new Error(fetchError ? fetchError.message : 'Project not found')
    }

    project.value = data
  } catch (err: any) {
    error.value = err.message
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
.text-gray-700 {
  color: #4a4a4a;
}
.image-darken {
  filter: brightness(0.6);
}
</style>
