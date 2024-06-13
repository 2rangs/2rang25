<template>
  <h1 class="text-5xl font-bold mb-6 text-center">{{ props.page }}</h1>
  <div class="flex justify-center items-center mb-6 space-x-4" >
    <UInput v-model="searchQuery" size="xl"  color="primary" class="p-3 max-w-md w-2/3 " placeholder="Search projects..." />
  </div>
  <div class="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 py-8">
    <div
        v-for="project in filteredProjects"
        :key="project.id"
        @click="navigateToProject(project.idx)"
        class="p-3 rounded-lg shadow-lg flex flex-col"
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
</template>
<script setup lang="ts">

import { useRouter } from 'vue-router'
import {onMounted, ref} from "vue"

const props = defineProps({
  page: String,
})

const projects = ref<any>([])
const router = useRouter();
const categories = ref<any>([])
const searchQuery = ref('')
const selectedCategory = ref('')

const getCategories = async () => {
  const { data, error } = await supabase.from('category').select('idx, name')
  if (error) {
    console.error(error)
  } else {
    categories.value = data
  }
}

const getProjects = async () => {
  const { data, error } = await supabase.from(props.page?.toLowerCase() as string).select(`
    idx,
    title,
    content,
    created_at,
    thumbnails,
    category ( idx, name )
  `)
  if (error) {
    console.error(error);
  } else {
    projects.value = data;
  }
};
const replaceMarkdownSyntax = (text: string): string => {
  // Replace image markdown with (이미지)
  const imageMarkdownRegex = /!\[.*?\]\(.*?\)/g
  text = text.replace(imageMarkdownRegex, '')

  // Replace code blocks with (코드 블록)
  const codeBlockRegex = /```[\s\S]*?```/g
  text = text.replace(codeBlockRegex, '')

  // Replace links with (링크)
  const linkMarkdownRegex = /\[.*?\]\(.*?\)/g
  text = text.replace(linkMarkdownRegex, '')

  // Replace headers with (헤더)
  const headerMarkdownRegex = /#+\s.*(\r\n|\r|\n)?/g
  text = text.replace(headerMarkdownRegex, '')

  const strikethroughMarkdownRegex = /~~.*?~~/g
  text = text.replace(strikethroughMarkdownRegex, '')

  const boldMarkdownRegex = /\*\*.*?\*\*/g
  text = text.replace(boldMarkdownRegex, '')

  const italicMarkdownRegex = /_.*?_/g;
  text = text.replace(italicMarkdownRegex, '')

  return text;
}
const truncateString = (text: string, maxLength: number): string => {
  const replacedText = replaceMarkdownSyntax(text);
  if (replacedText.length <= maxLength) {
    return replacedText;
  }
  return replacedText.substring(0, maxLength) + '...';
};


 const navigateToProject = (id: number) => {
   router.push(`/${props.page?.toLowerCase() as string}/${id}`)
 };

 const filteredProjects = computed(() => {
   return projects.value.filter((project : any) => {
     const matchesCategory = selectedCategory.value ? project.category.name === selectedCategory.value : true;
     const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
         project.content.toLowerCase().includes(searchQuery.value.toLowerCase());
     return matchesCategory && matchesSearch;
   })
 })
onMounted(() => {
  getProjects()
  getCategories()
});
</script>
<style scoped>

</style>