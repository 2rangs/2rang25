<template>
  <main-layout>
    <div class="min-h-screen">
      <div class="max-w-screen-lg mx-auto  p-3">
        <div v-if="loading" class="text-center">Loading...</div>
<!--        <div v-if="error" class="text-center text-red-500">{{ error }}</div>-->
        <div v-if="project" >
          <div class="relative  h-96 mb-6">
            <img :src="project.thumbnails" class="w-full h-full object-cover image-darken" alt="Thumbnail"/>
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
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight"
import chart from "@toast-ui/editor-plugin-chart"
import Prism from 'prismjs'
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell"
import uml from "@toast-ui/editor-plugin-uml"

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
onMounted( async () => {
  await fetchProject()
  useHead({
    title : `2rang25 - ${project.value.title}`,
    meta: [
      {
        property: 'og:title',
        content: `[ ${project.value.category.name} ] ${project.value.title}`
      },{
        property: 'og:description',
        content: `${truncateString(project.value.content, 15)}`
      },
      {
        property: 'og:image',
        content: project.value.thumbnails
      }]
  })
  if(document.getElementById('viewer') && project){
    viewer.value =  await toastViewerInstance(
        document.getElementById('viewer') as HTMLElement,
        project.value.content,
        "100%",
        [[codeSyntaxHighlight, { highlighter: Prism }], chart, tableMergedCell, uml],
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
