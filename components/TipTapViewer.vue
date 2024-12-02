<template>
  <MainLayout>
    <template #category >
      <UAside>
        <NuxtCategory />
      </UAside>
    </template>
    <div v-if="props.post" class="min-h-screen">
      <!-- 제목 영역 -->
      <header class="relative">
        <NuxtBreadcrumb />
        <span class="text-4xl xl:text-5xl h-20 font-bold text-black dark:text-white p-3 pb-0 border-0 w-full">
          {{ props.post.title }}
        </span>
        <div class=" flex">
          <div class="p-3">
            <UBadge
                size="md"
                color="primary"
                variant="outline"
                :label="getCategoryName(props.post.category_id)"
            />
          </div>
          <div class="p-4">
          <span class="line-highlight">
              {{dateConvert(props.post.created_at)}}
          </span>
          </div>
          <div class="pt-4">
          <span class="line-highlight italic text-gray-400">
             by 2rang25
          </span>
          </div>
        </div>
        <img
            :src="props.post.thumbnail"
            alt="thumbnail"
            class="max-w-full md:max-w-md lg:max-w-lg h-auto rounded-lg  m-auto p-5"
        />
      </header>

      <!-- 본문 -->
      <div class="relative max-w-5xl m-auto flex">
        <div class="flex-1 p-3">
          <EditorContent
              :editor="editor"
              class="prose dark:prose-dark max-w-none text-black dark:text-white"
          />
          <NuxtLike :post_id="post.id" :post_like="post.likes" />
          <NuxtComments />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
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
import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image'
import NuxtLike from "~/components/NuxtLike.vue";
import MainLayout from "~/layouts/MainLayout.vue";
import {getHierarchicalIndexes, TableOfContents} from "@tiptap-pro/extension-table-of-contents";
import {dateConvert, getCategoryName} from "~/utils/commons";


const props = defineProps({
  post: {
    type: Object, // post는 객체 타입이어야 함
    default: () => ({
      summary: '', // 기본값
      thumbnail: '', // 기본값
    })
  }
});

const editor = ref<Editor | null>();
const categories = ref<any[]>([]) // categories 데이터를 배열로 초기화
const items = ref();
const route = useRoute()
useHead({
  title : `2rang25 - ${route.fullPath.split('/')[2].replaceAll('-',' ')}`,
  meta: [
    {
      property: 'og:title',
      content: `${route.fullPath.split('/')[2].replaceAll('-',' ')}`
    }, {
      property: 'og:description',
      content: `${props.post?.summary}`
    }, {
      property: 'og:image',
      content: `${props.post.thumbnail}`
    }]
})

onMounted(async () => {
  categories.value = JSON.parse(localStorage.getItem('categories') as string)
  if (props) {
    editor.value = new Editor({
      editable: false,
      extensions: [StarterKit,Image,
        TableOfContents.configure({
          getIndex: getHierarchicalIndexes,
          onUpdate: (content) => {
            items.value = content;
          },
        })],
    });
    editor.value.commands.setContent(props.post.content);
  }
});
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
img {
  display: block !important;
  margin: auto !important;
}
</style>
