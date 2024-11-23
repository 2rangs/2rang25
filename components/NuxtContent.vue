<template>
    <h1 class="text-5xl font-bold mb-3 text-center">
      <span class="logo-text">
        <span class="text-primary">{{ page[0] }}</span>
        <span>{{ page.substring(1, page.length - 1) }}</span>
        <span class="text-primary">{{ page[page.length - 1] }}</span>
      </span>
    </h1>
    <div class="flex justify-center items-center mb-6 space-x-4 p-3">
      <USelectMenu v-model="selectedCategory" :options="categoryOption"
                   size="xl" fixed color="primary" variant="outline"
                   class="w-full lg:w-32"
                   value-attribute="name" option-attribute="name" />
      <UInput v-model="searchQuery" size="xl" color="primary" class="p-3 max-w-md w-2/3" placeholder="Search projects..." />
      <div class="flex items-center justify-end">
        <!-- 아이콘 버튼 -->
        <UButton
            @click="viewMod = !viewMod"
            class="p-3 w-full transition duration-200"
            :aria-label="viewMod ? 'Switch to Table View' : 'Switch to Card View'"
        >
          <template v-if="viewMod">
            <i class="fas fa-th-large text-lg transition duration-200 hover:text-primary"></i> <!-- 카드형 아이콘 -->
          </template>
          <template v-else>
            <i class="fas fa-bars text-lg transition duration-200 hover:text-primary"></i> <!-- 리스트형 아이콘 -->
          </template>
        </UButton>
      </div>
    </div>
    <div v-if="viewMod" class="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <div
          v-for="project in filteredProjects"
          :key="project.id"
          @click="navigateToProject(project.idx)"
          class="p-2 rounded-lg shadow-lg flex flex-col"
      >
        <div class="flex-shrink-0">
          <img :src="project.thumbnails" class="w-full h-48 object-cover rounded-t-lg" alt="Thumbnail" />
        </div>
        <div class="flex-grow mt-4 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold mb-2"> {{ `[ ${project.category.name} ] ${ truncateString(project.title, 20) }` }}</h3>
            <p>
              {{ truncateString(project.content, 70) }}
            </p>
          </div>
          <p class="text-sm text-right">{{ new Date(project.created_at).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
    <div v-else  class="m-3 p-2 rounded-lg shadow-lg flex flex-row items-start gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out cursor-pointer bg-white dark:bg-gray-900"
        v-for="project in filteredProjects"
        :key="project.id"
        @click="navigateToProject(project.idx)"
  >
    <div class="flex-shrink-0 w-1/3">
      <img :src="project.thumbnails" class="w-full h-48 object-cover rounded-lg" alt="Thumbnail" />
    </div>
    <div class="flex-grow flex flex-col justify-between p-2 mt-3">
      <div>
        <h3 class="text-3xl font-bold">
          {{ `[ ${project.category.name} ] ${truncateString(project.title, 20)}` }}
        </h3>
        <p class="pt-3">{{ truncateString(project.content, 250) }}</p>
      </div>
      <p class="text-lg text-right">{{ new Date(project.created_at).toLocaleDateString() }}</p>
    </div>
  </div>


</template>

<script setup lang="ts">
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
        : project.category.name === selectedCategory.value
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const replaceMarkdownSyntax = (text: string): string => {
  const imageMarkdownRegex = /!\[.*?\]\(.*?\)/g
  text = text.replace(imageMarkdownRegex, '')

  const codeBlockRegex = /```[\s\S]*?```/g
  text = text.replace(codeBlockRegex, '')

  const linkMarkdownRegex = /\[.*?\]\(.*?\)/g
  text = text.replace(linkMarkdownRegex, '')

  const headerMarkdownRegex = /#+\s.*(\r\n|\r|\n)?/g
  text = text.replace(headerMarkdownRegex, '')

  const strikethroughMarkdownRegex = /~~.*?~~/g
  text = text.replace(strikethroughMarkdownRegex, '')

  const boldMarkdownRegex = /\*\*.*?\*\*/g
  text = text.replace(boldMarkdownRegex, '')

  const italicMarkdownRegex = /_.*?_/g
  text = text.replace(italicMarkdownRegex, '')

  return text
}

const truncateString = (text: string, maxLength: number): string => {
  const replacedText = replaceMarkdownSyntax(text)
  if (replacedText.length <= maxLength) {
    return replacedText
  }
  return replacedText.substring(0, maxLength) + '...'
}

const navigateToProject = (id: number) => {
  router.push(`/${props.page?.toLowerCase() as string}/${id}`)
}

useHead({
  titleTemplate: () => {
    return `2rang25 - ${props.page?.toLowerCase()}`
  },
  meta: computed(() => {
    if(!props.page?.toLowerCase()) return []
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
onBeforeMount(async () => {
  const { data, error } = await supabase.from(props.page?.toLowerCase()).select(`
    idx,
    title,
    content,
    created_at,
    thumbnails,
    category ( idx, name )
  `).order('created_at', { ascending: false })
  projects.value = data
  await useAsyncData<any>('category', async () => {
  const {data, error} = await supabase.from('category').select('idx, name')
  categories.value = data
  categoryOption.value = data
  categoryOption.value.unshift({ idx: 0, name: 'All' })
})
  // await getUser()
})
</script>
<style scoped>
.image-darken {
  filter: brightness(0.5);
}
</style>
