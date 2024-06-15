<template>
  <h1 class="text-5xl font-bold mb-6 text-center">
    <span class="logo-text">
      <span class="text-primary">{{ props.page[0] }}</span>
      <span>{{ props.page.substring(1, props.page.length - 1)}}</span>
      <span class="text-primary">{{ props.page[props.page.length - 1] }}</span>
    </span>
  </h1>
  <div class="flex justify-center items-center mb-6 space-x-4 p-3" >
    <USelectMenu v-model="selectedCategory" :options="categoryOption"
             size="xl"
             color="primary"
             variant="outline"
                 value-attribute="name"
                 option-attribute="name" />
    <UInput v-model="searchQuery" size="xl"  color="primary" class="p-3 max-w-md w-2/3 " placeholder="Search projects..." />
    <UButton v-if="isUser" label="포스팅" size="xl" @click="isOpen = true"/>
    <UModal v-model="isOpen" fullscreen>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6">
              {{ page }} 포스팅 하기
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>
        <div class="p-6 max-w-7xl mx-auto rounded-xl shadow-md space-y-6">
          <div class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium">제목</label>
              <UInput v-model="title"  type="text" id="title" class="mt-1 block w-full px-3 py-2 " />
            </div>
            <div>
              <label for="thumbnail" class="block text-sm font-medium ">썸네일 URL</label>
              <UInput v-model="thumbnail"  type="text" id="thumbnail" class="mt-1 block w-full px-3 py-2" />
            </div>
            <div>
              <USelectMenu v-model="postingCategory" :options="categoryOption"
                           size="xl"
                           value-attribute="idx"
                           option-attribute="name" />
            </div>
            <div id="editor"></div>
          </div>
          <div>
            <UButton @click="postToSupabase" color="primary" class="w-full text-center block">포스팅 하기</UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
  <div class="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
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

</template>
<script setup lang="ts">

import { useRouter } from 'vue-router'
import {computed, onMounted, ref} from "vue"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import chart from "@toast-ui/editor-plugin-chart";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
import {useAsyncData, useHead} from "#imports";
const props = defineProps({
  page: String,
})
const isOpen = ref(false)
const router = useRouter();
const categories = ref<any>([])
const searchQuery = ref('')
const selectedCategory = ref('All')
const categoryOption = ref<any>([])
const title = ref('')
const thumbnail = ref('')
const postingCategory = ref(1)
const isUser = ref(false)
const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if(error) {
    isUser.value = false
  }else {
    isUser.value = true
  }

}
const getCategories = async () => {
  const { data, error } = await supabase.from('category').select('idx, name')
  if (error) {
    console.error(error)
  } else {
    categories.value = data
    categoryOption.value = data
    categoryOption.value.unshift({ idx: 0, name: 'All' })
  }
}

const filteredProjects = computed(() => {
  return projects.value.filter((project : any) => {
    const matchesCategory = selectedCategory.value === 'All' || !selectedCategory.value ? true : project.category.name === selectedCategory.value;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  })
})


const { data: projects, pending: loading, error } = await useAsyncData<any>('projects', async () => {
  const { data, error } = await supabase.from(props.page?.toLowerCase() as string).select(`
    idx,
    title,
    content,
    created_at,
    thumbnails,
    category ( idx, name )
  `)

  if (error) {
    throw new Error(error.message)
  }

  return data
})
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
}

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
 }
const editor = ref()
watch(isOpen, (nv) => {
  if(nv) {
    nextTick(async () => {
     editor.value =   await toastEditorInstance(
         document.getElementById('editor') as HTMLElement,
         'markdown',
         "500px",
         [[codeSyntaxHighlight, { highlighter: Prism }], chart, tableMergedCell, uml],
         useColorMode().preference
     )
    })
  }
})

const postToSupabase = async () => {
  const { data, error } = await supabase
      .from(props.page?.toLowerCase() as string)
      .insert([
        {
          title: title.value,
          content: editor.value.getMarkdown(),
          category_id: postingCategory.value,
          thumbnails: thumbnail.value,
          created_by:'2rang25'
        }
      ])

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', data);
    isOpen.value = false; // 성공적으로 포스팅하면 모달을 닫습니다.
    await getProjects()
  }
}

useHead({
  title: computed(() => `2rang25's ${props.page?.toLowerCase() }`),
  meta: computed(() => {
    if (!projects.value) return []
    return [
      {
        property: 'og:title',
        content: `2rang25's ${props.page?.toLowerCase() }`
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

onMounted( () => {
  nextTick(async () => {
    await getUser()
    // await getProjects()
    await getCategories()
  })
})
</script>
<style scoped>

</style>