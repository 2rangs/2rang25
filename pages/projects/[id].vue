<template>
  <main-layout>
    <div class="min-h-screen">
      <div class="max-w-screen-lg mx-auto p-3">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-if="project">
          <div class="relative h-96 mb-6">
            <img :src="project.thumbnails" class="w-full h-full object-cover image-darken" alt="Thumbnail" />
            <div class="relative inset-0 flex flex-col">
              <div class="bottom-0 absolute p-3.5">
                <h1 class="text-4xl font-bold text-white mb-2.5">{{ `[ ${project.category.name} ] ${project.title}` }}</h1>
                <span class="text-white">{{ new Date(project.created_at).toLocaleDateString() }}</span>
                <span class="text-white ml-3">by {{ project.created_by }}</span>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useAsyncData, useHead, toastViewerInstance } from '#imports'
import MainLayout from '~/layouts/MainLayout.vue'
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight"
import chart from "@toast-ui/editor-plugin-chart"
import Prism from 'prismjs'
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell"
import uml from "@toast-ui/editor-plugin-uml"
interface Project {
  title: string;
  content: string;
  created_at: string;
  created_by: string;
  thumbnails: string;
  category: { name: string };
}

const route = useRoute()

const { data: project, pending: loading, error } = await useAsyncData<Project | null>('project', async () => {
  const projectId = route.params.id as string
  const { data, error } = await supabase
      .from('projects')
      .select('idx, title, content, created_at, created_by, thumbnails, category ( name )')
      .eq('idx', projectId)
      .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
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

useHead({
  title: computed(() => project.value ? `2rang25 - ${project.value.title}` : '2rang25'),
  meta: computed(() => {
    if (!project.value) return []
    return [
      {
        property: 'og:title',
        content: `[ ${project.value.category.name} ] ${project.value.title}`
      },
      {
        property: 'og:description',
        content: truncateString(project.value.content, 20).replace(' ','')
      },
      {
        property: 'og:image',
        content: project.value.thumbnails
      }
    ]
  })
})

const viewer = ref()

onMounted(async () => {
  if (document.getElementById('viewer') && project.value) {
    viewer.value = await toastViewerInstance(
        document.getElementById('viewer') as HTMLElement,
        project.value.content,
        "100%",
        [[codeSyntaxHighlight, { highlighter: Prism }], chart, tableMergedCell, uml],
        useColorMode().preference
    )
  } else {
    console.log('not found div!')
  }
})
</script>

<style scoped>
.image-darken {
  filter: brightness(0.5);
}
</style>
