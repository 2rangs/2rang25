<template>
  <ClientOnly>
    <MainLayout>
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
            <div class="flex w-full">
              <div  class="w-1/2 p-3" >
                <label for="title" class="block text-sm font-medium">카테고리</label>
                <USelectMenu class="pt-3"  v-model="postingCategory" :options="categoryOption"
                             size="xl" value-attribute="idx" option-attribute="name" />
              </div>
              <div  class="w-1/2 p-3" >
                <label for="title" class="block text-sm font-medium">분류</label>
                <USelectMenu class="pt-3" v-model="postingTarget" :options="targetOptions"
                             size="xl" value-attribute="value" option-attribute="label" />
              </div>
            </div>
          </div>
          <div id="editor" />
          <div>
            <UButton @click="postToSupabase" color="primary" class="w-full text-center block">포스팅 하기</UButton>
          </div>
        </div>
    </MainLayout>
  </ClientOnly>
</template>

<script setup lang="ts">
import MainLayout from "~/layouts/MainLayout.vue";
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAsyncData } from '#imports'
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import chart from "@toast-ui/editor-plugin-chart";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
import Prism from "prismjs";
//
const isUser = ref(false)
const router = useRouter()
const categoryOption = ref()
const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    router.push('/login') // 로그인이 안되어 있으면 로그인 페이지로 리디렉션
  } else {
    isUser.value = true
    await useAsyncData<any>('category', async () => {
      const {data, error} = await supabase.from('category').select('idx, name')
      categoryOption.value = data
    })
  }
}
const isOpen = ref(false)
const title = ref('')
const thumbnail = ref('')
const postingCategory = ref(1)
const postingTarget = ref('projects') // 기본값은 projects로 설정
const editor = ref()


const targetOptions = ref([
  { value: 'projects', label: 'Projects' },
  { value: 'blogs', label: 'Blogs' }
])

// watch(isOpen, (nv) => {
//   if (nv) {
//     nextTick(async () => {
//       editor.value = await toastEditorInstance(
//           document.getElementById('editor') as HTMLElement,
//           'markdown',
//           "500px",
//           [[codeSyntaxHighlight, { highlighter: Prism }], chart, tableMergedCell, uml],
//           useColorMode().preference
//       )
//     })
//   }
// })
// editor.value =  toastEditorInstance(
//     document.getElementById('editor') as HTMLElement,
//     'markdown',
//     "500px",
//     [[codeSyntaxHighlight, { highlighter: Prism }], chart, tableMergedCell, uml],
//     useColorMode().preference
// )

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
    router.push(`/${postingTarget.value}`)
  }
}

onMounted(async () => {
  await getUser()
  if(document.getElementById('editor')) {
    await nextTick(() => {
      editor.value = toastEditorInstance(
          document.getElementById('editor') as HTMLElement,
          'markdown',
          "500px",
          [[codeSyntaxHighlight, {highlighter: Prism}], chart, tableMergedCell, uml],
          useColorMode().preference
      )
    })
  }
})

</script>


<style scoped>
/* Additional styling can be defined here if needed */
</style>
