<template>
  <MainLayout>
    <template #category >
      <UAside>
        <NuxtCategory />
      </UAside>
    </template>
    <div v-if="props.post" class="min-h-screen ">
      <!-- 제목 영역 -->
      <header class="relative">
        <NuxtBreadcrumb />
        <span class="text-3xl xl:text-5xl h-20 font-bold text-black dark:text-white p-3 border-0 w-full">
         {{ props.post.title }}
        </span>
        <div class=" flex">
          <div class="p-3">
            <UBadge
                size="md"
                color="primary"
                variant="outline"
                :label='props.post.category.name'
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
            class="max-w-full md:max-w-md lg:max-w-lg h-auto m-auto p-5"
        />
      </header>

      <!-- 본문 -->
      <div class="relative max-w-5xl m-auto flex">
        <div class="flex-1 ">
          <EditorContent
              :editor="editor"
              class="prose dark:prose-dark max-w-5xl w-screen text-black dark:text-white" />
          <NuxtLike :post_id="post.id" :post_like="post.likes" />
          <NuxtSurround :category="props.post.category_id" />
          <NuxtGiscus/>
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
import Image from '@tiptap/extension-image'
import NuxtLike from "~/components/NuxtLike.vue";
import MainLayout from "~/layouts/MainLayout.vue";
import {getHierarchicalIndexes, TableOfContents} from "@tiptap-pro/extension-table-of-contents";
import {dateConvert} from "~/utils/commons";
import {Text} from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import {Paragraph} from "@tiptap/extension-paragraph";
import {Document} from "@tiptap/extension-document";
import Blockquote from "@tiptap/extension-blockquote";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import NodeRange from "@tiptap-pro/extension-node-range";
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import json from "highlight.js/lib/languages/json";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import {all, createLowlight} from "lowlight";
import {BulletList} from "@tiptap/extension-bullet-list";
import {OrderedList} from "@tiptap/extension-ordered-list";
import {ListItem} from "@tiptap/extension-list-item";
import {Link} from "@tiptap/extension-link";
import {Strike} from "@tiptap/extension-strike"

const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('python', python)
lowlight.register('cpp', cpp)
lowlight.register('json', json)
lowlight.register('java', java)
lowlight.register('c', c)
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
const category = ref() // categories 데이터를 배열로 초기화
const items = ref();
const route = useRoute()
const fullPath = route.fullPath;
const pathWithoutHash = fullPath.includes('#') ? fullPath.split('#')[0] : fullPath; // # 여부 체크 후 처리
const title = decodeURIComponent(pathWithoutHash.split('/')[2]?.replaceAll('-', ' ') || '')

useSeoMeta({
  title: `2rang25 - ${title}`,
  ogTitle: `2rang25 - ${title}`,
  description: `${props.post?.summary}`,
  ogDescription: `${props.post?.summary}`,
  ogImage: `${props.post.thumbnail}`
})

onMounted(async () => {
  if (props) {
    editor.value = new Editor({
      editable : false,
      extensions: [
        Text,
        Heading,
        Paragraph,
        Document,
        Blockquote,
        BulletList,
        OrderedList,
        ListItem,
        Strike,
        Link.configure({
          openOnClick: false,
          defaultProtocol: 'https',
        }),
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
        })
      ],
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
  width: 95% !important;
  margin: 0 auto;
  padding: 10px;
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
blockquote, h1, h2, h3, h4, h5, h6 {
  @apply text-black dark:text-white;
}
input {
  background: none !important;
}
img {
  display: block !important;
  margin: auto !important;
  border-radius: 10px !important;
}
pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: 'JetBrainsMono', monospace;
  margin : 0 auto !important;
  code {
    background: none;
    color: inherit;
    font-size: 0.8rem;
    padding: 0;
  }

  /* Code styling */
  .hljs-comment,
  .hljs-quote {
    color: #a4a4a4;
  }

  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-tag,
  .hljs-name,
  .hljs-regexp,
  .hljs-link,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #f98181;
  }

  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: #fbbc88;
  }

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: #b9f18d;
  }

  .hljs-title,
  .hljs-section {
    color: #faf594;
  }

  .hljs-keyword,
  .hljs-selector-tag {
    color: #70cff8;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: 700;
  }
}
</style>
