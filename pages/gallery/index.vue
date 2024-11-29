<template>
  <MainLayout>
    <div class="max-w-7xl">
          <div class="max-w-7xl">
            <!-- 썸네일과 제목 영역 -->
            <header class="relative mx-auto">
              <!-- 썸네일 -->
              <div class="relative">
                <!-- 텍스트 오버레이 -->
                <NuxtBreadcrumb />
                <input
                    :readonly="!user"
                    maxlength="40"
                    type="text"
                    placeholder="제목을 입력하세요."
                    class="text-4xl xl:text-5xl h-20 font-bold text-black dark:text-white p-3 pb-0 border-0 focus:ring-0 focus:outline-none w-full"
                    v-model="title"
                />
                <div class="p-3 flex justify-between">
                  <div>
                    <UBadge
                        size="md"
                        class="mr-2"
                        :ui="{ rounded: 'rounded-full' }"
                        variant="outline"
                        label="# CSS"
                        :trailing="false" />
                  </div>
                </div>
                <div class="flex p-3">
                  <UAvatar
                      chip-color="primary"
                      chip-position="top-right"
                      size="sm"
                      src="https://avatars.githubusercontent.com/u/739984?v=4"
                      alt="Avatar"
                  />
                  <span class="p-1 ml-2">2rang25</span>
                  <UPopover class="max-w-44" :popper="{ placement: 'bottom-start' }">
                    <UButton :disabled="!user" :label="format(date, 'yyyy / MM / dd')" variant="ghost"/>
                    <template #panel="{ close }">
                      <NuxtDatePicker v-model="date" is-required @close="close" />
                    </template>
                  </UPopover>
                </div>
              </div>
            </header>
            <!-- 본문 -->
            <div class="max-w-7xl m-auto flex">
              <!-- 에디터 -->
              <div class="flex-1 p-3">
                <EditorContent
                    :editor="editor"
                    class="prose dark:prose-dark max-w-none text-black dark:text-white"
                />
                <NuxtComments />
              </div>
            </div>
          </div>
        </div>
    <template #toc>
            <ToC
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
import StarterKit from "@tiptap/starter-kit";
import DragHandle from "@tiptap-pro/extension-drag-handle";
import NodeRange from "@tiptap-pro/extension-node-range";
import Image from '@tiptap/extension-image'
import Blockquote from '@tiptap/extension-blockquote'
import FileHandler from '@tiptap-pro/extension-file-handler'
import { getHierarchicalIndexes, TableOfContents } from "@tiptap-pro/extension-table-of-contents";
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// create a lowlight instance
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
import { format } from 'date-fns'
import NuxtDatePicker from "~/components/NuxtDatePicker.vue";
import NuxtBreadcrumb from "~/components/NuxtBreadcrumb.vue";
import MainLayout from "~/layouts/MainLayout.vue";

const date = ref(new Date())
const title = ref('This is Title area. let;s go!')
const { data: { user } } = await supabase.auth.getUser()
const editor = ref<Editor | null>();
const items = ref();
const currentSection = ref("");
const content = ref(`
{ "type": "doc", "content": [ { "type": "paragraph", "content": [ { "text": "This is the content for post 182. It provides detailed information on the topic.", "type": "text" } ] } ] }
`)

onMounted(() => {
  if(user){
    editor.value = new Editor({
      editable : true,
      extensions: [
        StarterKit,
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
  }else {
    editor.value = new Editor({
      editable : false,
      extensions: [
        StarterKit,
        Image,
        NodeRange.configure({ depth: 0 }),
        TableOfContents.configure({
          getIndex: getHierarchicalIndexes,
          onUpdate: (content) => {
            items.value = content;
          },
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
      ],
    });
  }
  editor.value?.commands.setContent(JSON.parse(content.value))
  window.addEventListener("scroll", updateCurrentSection);
});

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
// const postToSupabase = async () => {
//   const { data, error } = await supabase
//       .from(postingTarget.value)
//       .insert([
//         {
//           title: title.value,
//           content: JSON.stringify(previousContent),
//           category_id: postingCategory.value,
//           thumbnails: thumbnail.value,
//           created_by: '2rang25'
//         }
//       ])
//
//   if (error) {
//     console.error('Error inserting data:', error)
//   } else {
//     console.log('Data inserted successfully:', data)
//     router.push(`/${postingTarget.value}`)
//   }
// }
let previousContent : any; // 이전 값을 저장
watch(
    () => editor.value?.getJSON(), // editor의 JSON 값을 감시
    async (newContent) => {
      const newContentString = JSON.stringify(newContent);
      if (newContentString !== JSON.stringify(previousContent)) {
        // db 전송
        previousContent = newContent; // 이전 값 갱신
        const route = useRoute()
        console.log(`
        table : ${route.fullPath.split('/')[1]}
        title : ${title.value}
        date : ${date.value}
        category : ${'category'}
        tags : ${'tags'}
        content : ${JSON.stringify(previousContent)}
        `)
        // await postToSupabase()
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
}
</style>
