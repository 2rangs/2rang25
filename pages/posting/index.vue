<template>
  <main-layout>
    <client-only>
      <div class="p-6 max-w-7xl mx-auto rounded-xl shadow-md space-y-6">
        <div class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium">제목</label>
            <UInput v-model="title" type="text" id="title" class="mt-1 block w-full px-3 py-2" />
          </div>
          <div>
            <label for="thumbnail" class="block text-sm font-medium">썸네일 URL</label>
            <UInput v-model="thumbnail" type="text" id="thumbnail" class="mt-1 block w-full px-3 py-2" />
          </div>
          <div>
            <USelectMenu v-model="postingCategory" :options="categoryOption"
                         size="xl" value-attribute="idx" option-attribute="name" />
          </div>
          <div>
            <USelectMenu v-model="postingTarget" :options="targetOptions"
                         size="xl" value-attribute="value" option-attribute="label" />
          </div>
          <div id="editor"></div>
        </div>
        <div>
          <UButton @click="postToSupabase" color="primary" class="w-full text-center block">포스팅 하기</UButton>
        </div>
      </div>
    </client-only>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAsyncData, toastEditorInstance } from '#imports'
import MainLayout from '~/layouts/MainLayout.vue'
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight"
import chart from "@toast-ui/editor-plugin-chart"
import Prism from 'prismjs'
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell"
import uml from "@toast-ui/editor-plugin-uml"
import { useColorMode } from '@vueuse/core'

const isUser = ref(false)
const router = useRouter()

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    router.push('/login') // 로그인이 안되어 있으면 로그인 페이지로 리디렉션
  } else {
    isUser.value = true
  }
}

onMounted(async () => {
  await getUser()
  if(editor){
    editor.value = await toastViewerInstance(
        document.getElementById('viewer') as HTMLElement,
        'markdown',
        "100%",
        [[codeSyntaxHighlight, { highlighter: Prism }], chart, tableMergedCell, uml],
        useColorMode().preference
    )
  }
})

const isOpen = ref(false)
const title = ref('')
const thumbnail = ref('')
const postingCategory = ref(1)
const postingTarget = ref('projects') // 기본값은 projects로 설정
const isLoading = ref(false)
const editor = ref()

const categoryOption = ref([
  // 카테고리 옵션 예제 데이터
  { idx: 1, name: 'Category 1' },
  { idx: 2, name: 'Category 2' }
])

const targetOptions = ref([
  { value: 'projects', label: 'Projects' },
  { value: 'blogs', label: 'Blogs' }
])

watch(isOpen, (nv) => {
  if (nv) {
    nextTick(async () => {
      editor.value = await toastEditorInstance(
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
      .from(postingTarget.value)
      .insert([
        {
          title: title.value,
          content: editor.value.getMarkdown(),
          category_id: postingCategory.value,
          thumbnails: thumbnail.value,
          created_by: '2rang25'
        }
      ])

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Data inserted successfully:', data)
    isOpen.value = false // 성공적으로 포스팅하면 모달을 닫습니다.
  }
}
</script>


<style scoped>
/* Additional styling can be defined here if needed */
</style>
