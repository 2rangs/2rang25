<template>
  <MainLayout>
    <template #category >
      <UAside>
        <NuxtCategory />
      </UAside>
    </template>
    <div class="min-h-screen">
      <!-- 제목 영역 -->
      <header class="relative">
        <NuxtBreadcrumb />
        <input class="text-4xl xl:text-5xl h-20 font-bold text-black dark:text-white p-3 border-0 w-full" v-model="title" />
        <input class="text-2xl xl:text-3xl h-20 font-bold text-black dark:text-white p-3 border-0 w-full" v-model="summary" />
        <input class="text-xl h-20 font-bold text-black dark:text-white p-3 border-0 w-full" v-model="thumbnail" />
        <img
            :src="thumbnail"
            alt="thumbnail"
            class="max-w-full md:max-w-md lg:max-w-lg h-auto rounded-lg  m-auto p-5"
        />
        <div class=" flex">
          <div class="p-3">
            <USelectMenu v-model="selected" :options="category" />
          </div>
          <div class="p-4">
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'yyyy-MM-dd')" />
              <template #panel="{ close }">
                <DatePicker v-model="date" is-required @close="close" />
              </template>
            </UPopover>
          </div>
          <div class="pt-4">
          <span class="line-highlight italic text-gray-400">
             by 2rang25
          </span>
          </div>
        </div>
      </header>

      <!-- 본문 -->
      <div class="relative max-w-5xl m-auto flex">
        <div class="flex-1 p-3">
          <EditorContent
              :editor="editor"
              class="prose dark:prose-dark max-w-none text-black dark:text-white"
          />

          <UButton label="글 작성 하기" class="block m-auto" @click="writing"/>
          <NuxtGiscus/>
        </div>
      </div>
    </div>
    <template #toc>
      <ToC
          v-if="editor"
          :editor="editor"
          :items="items"
          class="sticky"
      />
    </template>
  </MainLayout>
</template>



<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import {Document} from "@tiptap/extension-document";
import Heading from '@tiptap/extension-heading'
import {Text} from "@tiptap/extension-text"
import DragHandle from "@tiptap-pro/extension-drag-handle";
import NodeRange from "@tiptap-pro/extension-node-range";
import Image from '@tiptap/extension-image'
import Blockquote from '@tiptap/extension-blockquote'
import FileHandler from '@tiptap-pro/extension-file-handler'
import { getHierarchicalIndexes, TableOfContents } from "@tiptap-pro/extension-table-of-contents";
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import {Paragraph} from "@tiptap/extension-paragraph";
import MainLayout from "~/layouts/MainLayout.vue";
import {DatePicker} from "v-calendar";
import {format} from "date-fns";
// create a lowlight instance

const router = useRouter()
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
const category = ref<any[]>([])
const selected = ref()
const date = ref(new Date())
const title = ref('This is Title area. ')
const summary = ref('This is Summary area.')
const thumbnail = ref('https://i.pinimg.com/736x/08/a9/65/08a965f8536be44318d9729c27855eab.jpg')
const { data: { user } } = await supabase.auth.getUser()
const editor = ref<Editor | null>();
const items = ref();
const currentSection = ref("")
const content = ref(`
{ "type": "doc", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "That’s a boring paragraph followed by a fenced code block:" } ]}] }
`)

onMounted(() => {
  supabase.auth.getUser().then((res : any) =>{
    if(res.data.user){
      editor.value = new Editor({
        editable : true,
        extensions: [
          Text,
          Heading,
          Paragraph,
          Document,
          Blockquote,
          Youtube.configure({
            controls: false,
            nocookie: true,
          }),
          CodeBlockLowlight.configure({
            lowlight,
          }),
          Image,
          NodeRange.configure({ depth: 0 }),
          TableOfContents.configure({
            getIndex: getHierarchicalIndexes,
            onUpdate: (content) => {
              items.value = content;
            },
          }),
          DragHandle.configure({
            render() {
              const element = document.createElement("div");
              element.textContent = "⠿";
              element.className = "custom-drag-handle";
              return element;
            },
          }),
          FileHandler.configure({
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            onDrop: (currentEditor, files, pos) => {
              files.forEach(file => {
                const fileReader = new FileReader()

                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                  currentEditor.chain().insertContentAt(pos, {
                    type: 'image',
                    attrs: {
                      src: fileReader.result,
                    },
                  }).focus().run()
                }
              })
            },
            onPaste: (currentEditor, files) => {
              files.forEach(file => {
                const fileReader = new FileReader()

                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                  currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                    type: 'image',
                    attrs: {
                      src: fileReader.result,
                    },
                  }).focus().run()
                }
              })
            },
          }),
        ],

        // content: content.value,
      });
      editor.value?.commands.setContent(JSON.parse(content.value))
      window.addEventListener("scroll", updateCurrentSection)
      JSON.parse(localStorage.getItem('categories') as string)?.map((root : any) => {
        root.children.map((tree : any) => {
          tree.children.map((child : any) => {
            category.value.push({
              label : child.title.split(' (')[0],
              id : child._id
            })
          })
        })
      })
      selected.value = category.value[0]
    }else {
      router.push({path : '/'})
    }
  })
});

const writing = async () => {
  await postToSupabase()
}
const updateCurrentSection = () => {
  const sections = document.querySelectorAll("h1, h2");
  let found = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      found = section.id;
    }
  });

  currentSection.value = found;
};
const postToSupabase = async () => {
  const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: title.value.trim(),
          summary: summary.value.trim(),
          category_id: selected.value.id.trim(),
          thumbnail: thumbnail.value.trim(),
          content: JSON.stringify(previousContent),
          created_at: date.value,
          views : 0,
          likes : 0
        }
      ])

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    router.push({path : `/posts`})
  }
}
let previousContent : any; // 이전 값을 저장
watch(
    () => editor.value?.getJSON(), // editor의 JSON 값을 감시
   async (newContent) => {
      const newContentString = JSON.stringify(newContent);
      if (newContentString !== JSON.stringify(previousContent)) {
        previousContent = newContent; // 이전 값 갱신
      }
    },
    { deep: true }
);
</script>

<style lang="scss">
/* 부모 컨테이너 레이아웃 조정 */
.max-w-screen-lg {
  position: relative;
  overflow: visible; /* sticky가 작동하도록 설정 */
}

::selection {
  background-color: #70CFF850;
}

.ProseMirror {
  outline: none;
}

.ProseMirror * {
  margin-top: 0.75em;
}

.ProseMirror > * {
  margin-left: 1rem;
}

.ProseMirror .ProseMirror-widget * {
  margin-top: auto;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}

.ProseMirror-noderangeselection *::selection {
  background: transparent;
}

.ProseMirror-noderangeselection * {
  caret-color: transparent;
}

.ProseMirror-selectednode,
.ProseMirror-selectednoderange {
  position: relative;
}

.ProseMirror-selectednode::before,
.ProseMirror-selectednoderange::before {
  position: absolute;
  pointer-events: none;
  z-index: -1;
  content: '';
  top: -0.25rem;
  left: -0.25rem;
  right: -0.25rem;
  bottom: -0.25rem;
  background-color: #70CFF850;
  border-radius: 0.2rem;
}
.custom-drag-handle {
  cursor: pointer;
  position: relative; /* 상대적 위치 설정 */
}

.custom-drag-handle::after {
  display: none; /* 기본 상태에서 숨김 */
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1.25rem;
  content: '⠿';
  font-weight: 700;
  cursor: grab;
  background: #0D0D0D10;
  color: rgba(114, 114, 114, 0.31);
  border-radius: 0.25rem;
  position: absolute; /* 부모 요소에 상대적인 위치 */
  top: 50%; /* 부모 요소의 중앙 */
  left: 0;
  transform: translateY(-50%);
}

.custom-drag-handle:hover::after {
  display: flex; /* 호버 시 표시 */
}
.tiptap:first-child {
  margin-top: 0;
}

.tiptap pre {
  background: var(bg-gray-900);
  border-radius: 0.5rem;
  color: var(bg-white);
  font-family: 'JetBrainsMono', monospace;
}

.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

/* Code styling */
.tiptap pre .hljs-quote {
  color: #616161;
}

.tiptap pre .hljs-variable,
.tiptap pre .hljs-template-variable,
.tiptap pre .hljs-attribute,
.tiptap pre .hljs-tag,
.tiptap pre .hljs-name,
.tiptap pre .hljs-regexp,
.tiptap pre .hljs-link,
.tiptap pre .hljs-selector-id,
.tiptap pre .hljs-selector-class {
  color: #f98181;
}

.tiptap pre .hljs-number,
.tiptap pre .hljs-meta,
.tiptap pre .hljs-built_in,
.tiptap pre .hljs-builtin-name,
.tiptap pre .hljs-literal,
.tiptap pre .hljs-type,
.tiptap pre .hljs-params {
  color: #fbbc88;
}

.tiptap pre .hljs-string,
.tiptap pre .hljs-symbol,
.tiptap pre .hljs-bullet {
  color: #b9f18d;
}

.tiptap pre .hljs-title,
.tiptap pre .hljs-section {
  color: #faf594;
}

.tiptap pre .hljs-keyword,
.tiptap pre .hljs-selector-tag {
  color: #70cff8;
}

.tiptap pre .hljs-emphasis {
  font-style: italic;
}

.tiptap pre .hljs-strong {
  font-weight: 700;
}
blockquote, h1, h2, h3, h4, h5, h6 {
  @apply text-black dark:text-white;
}
input {
  background: none !important;
  outline: none !important;
}
</style>
