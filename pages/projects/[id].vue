<template>
  <main-layout>
    <div class="min-h-screen">
      <div class="max-w-screen-xl mx-auto rounded-lg shadow-lg p-3">
        <div v-if="loading" class="text-center">Loading...</div>
<!--        <div v-if="error" class="text-center text-red-500">{{ error }}</div>-->
        <div v-if="project" >
          <div class="relative  h-96 mb-6">
            <img :src="project.thumbnails" class="w-full h-full object-cover rounded-lg shadow-lg image-darken" alt="Thumbnail"/>
            <div class="relative  inset-0 flex flex-col">
              <div class="bottom-0 absolute p-3.5">
                <h1 class="text-4xl font-bold text-white mb-2.5">{{ `[ ${project.category.name} ] ${project.title}` }}</h1>
                <span class="text-white">{{ new Date(project.created_at).toLocaleDateString() }}</span>
                <span class="text-white ml-3">by {{ project.created_by}}</span>
              </div>
            </div>
          </div>
          <div id="viewer" />
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {toastViewerInstance, useRoute} from '#imports'
import MainLayout from '~/layouts/MainLayout.vue'

const route = useRoute()
const project = ref()
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
const viewer = ref()
onBeforeMount( async () => {
  await fetchProject()
  if(document.getElementById('viewer') && project){
    viewer.value =  await toastViewerInstance(
        document.getElementById('viewer') as HTMLElement,
        project.value.content,
        "50vh",
        useColorMode().preference
    )
  }else {
    console.log('not found div!')
  }
})
</script>

<style scoped>
.image-darken {
  filter: brightness(0.5);
}
</style>
