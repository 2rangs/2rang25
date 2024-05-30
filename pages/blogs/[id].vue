<template>
  <main-layout>
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-if="blog">
          <div class="relative w-full h-96 mb-6">
            <img :src="blog.thumbnails" class="w-full h-full object-cover rounded-lg shadow-lg image-darken" alt="Thumbnail"/>
            <div class="relative  inset-0 flex flex-col">
              <div class="bottom-0 absolute p-3.5">
                <h1 class="text-4xl font-bold text-white mb-2.5">{{ `[ ${blog.category.name} ] ${blog.title}` }}</h1>
                <span>{{ new Date(blog.created_at).toLocaleDateString() }}</span>
                <span class="ml-3">by {{ blog.created_by}}</span>
              </div>
            </div>
          </div>
          <div class="mb-6 text-gray-500 text-sm flex justify-between items-center">
          </div>
          <p class="text-gray-700 leading-relaxed">{{ blog.content }}</p>
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
const blog = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchBlogs = async () => {
  try {
    const { data, error: fetchError } = await supabase
        .from('blogs')
        .select('idx, title, content, created_at, created_by, thumbnails, category ( name )')
        .eq('idx', route.params.id)
        .single()

    if (fetchError || !data) {
      throw new Error(fetchError ? fetchError.message : 'Blogs not found')
    }

    blog.value = data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchBlogs)
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
