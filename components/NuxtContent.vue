<template>
  <div id="wrapper" class="p-4">
    <!-- 프로젝트 목록 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="p in filteredProjects"
          :key="p.id"
          class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
      >
        <!-- 썸네일 -->
        <img
            :src="p.thumbnail"
            alt="thumbnail"
            class="w-full h-48 object-cover"
        />
        <!-- 내용 -->
        <div class="p-4">
          <!-- 제목 -->
          <h2 class="text-lg font-bold text-gray-800 mb-2">
            {{ p.title }}
          </h2>
          <!-- 요약 -->
          <p class="text-gray-600 text-sm line-clamp-3 mb-4">
            {{ p.summary }}
          </p>
          <!-- 태그 -->
          <div class="flex flex-wrap gap-2">
            <span
                v-for="tag in p.tags"
                :key="tag"
                class="text-xs font-medium bg-blue-100 text-blue-600 py-1 px-2 rounded-full"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

const props = defineProps<{ page: string }>()
const projects = ref<any>([])
const categories = ref<any>([])
const searchQuery = ref('')
const selectedCategory = ref('All')
const categoryOption = ref<any>([])
const viewMod = ref(true) // true = card / false = list
const router = useRouter()

const filteredProjects = computed(() => {
  return projects.value.filter((project: any) => {
    const matchesCategory = selectedCategory.value === 'All' || !selectedCategory.value
        ? true
        : project.category?.name === selectedCategory.value
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.content?.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const navigateToProject = (id: number) => {
  router.push(`/${props.page?.toLowerCase()}/${id}`)
}

useHead({
  titleTemplate: () => {
    return `2rang25 - ${props.page?.toLowerCase()}`
  },
  meta: computed(() => {
    if (!props.page?.toLowerCase()) return []
    return [
      {
        property: 'og:title',
        content: `2rang25's ${props.page?.toLowerCase()}`
      },
      {
        property: 'og:description',
        content: `2rang25's ${props.page?.toLowerCase()} 페이지 입니다.`
      },
      {
        property: 'og:image',
        content: 'https://i.pinimg.com/564x/f6/d0/0a/f6d00a247fa38686475a7cbf6b1a641d.jpg'
      }
    ]
  })
})

// Supabase에서 데이터 가져오기
onBeforeMount(async () => {
  // 프로젝트 데이터 가져오기
  const { data: projectData, error: projectError } = await supabase
      .from('posts')
      .select(`
      *
    `)
  if (projectError) {
    console.error('Error fetching projects:', projectError)
  } else {
    projects.value = projectData
  }

  // 카테고리 데이터 가져오기
  const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('*')
  if (categoryError) {
    console.error('Error fetching categories:', categoryError)
  } else {
    categories.value = categoryData
    categoryOption.value = categoryData
    categoryOption.value.unshift({ idx: 0, name: 'All' })
  }
})
</script>
