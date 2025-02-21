<template>
  <MainLayout>
    <!-- 제목 영역 -->
    <div v-if="data && data.title && data.thumbnail" class="relative w-full mb-12 p-4">
      <div class="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
        <img
            :src="data.thumbnail"
            alt="thumbnail"
            class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white">
          <span class="text-5xl font-bold p-4">{{ data.title }}</span>
          <div class="flex items-center space-x-4">
            <span>{{ dateConvert(data.created_at) }}</span>
            <span class="italic text-gray-300">by 2rang25</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 본문 영역 -->
    <div class="min-h-screen max-w-7xl mx-auto p-4">
      <div v-if="data" v-html="htmlContent" class="prose dark:prose-invert prose-lg"></div>
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    </div>

    <!-- 좋아요 및 주변 글 -->
    <div class="mt-12 space-y-6">
      <NuxtLike :post_id="data.id" :post_like="data.likes" />
      <NuxtSurround :category="data.category_id" />
      <NuxtGiscus />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { dateConvert, useFetch } from '#imports';
import MainLayout from "~/layouts/MainLayout.vue";
import { generateHTML } from '@tiptap/html';
import Image from '@tiptap/extension-image';
import { Text } from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Document } from "@tiptap/extension-document";
import Blockquote from "@tiptap/extension-blockquote";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import NodeRange from "@tiptap-pro/extension-node-range";
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import json from "highlight.js/lib/languages/json";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import 'highlight.js/styles/github.css'; // 예시
import { all, createLowlight } from "lowlight";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { Link } from "@tiptap/extension-link";
import { Strike } from "@tiptap/extension-strike";
import NuxtLike from "~/components/NuxtLike.vue";

const route = useRoute();
const lowlight = createLowlight();
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);
lowlight.register('python', python);
lowlight.register('cpp', cpp);
lowlight.register('json', json);
lowlight.register('java', java);
lowlight.register('c', c);


// ✅ URL에서 slug 추출
const slug = computed(() => {
  const path = decodeURIComponent(route.path.split('/')[2] || '');
  return path.replaceAll('-', ' ');
});

// ✅ SSR에서 '/api/posts' 호출
const { data, error } = await useFetch(`/api/posts/title/${encodeURIComponent(slug.value)}`);

// ✅ TipTap의 generateHTML 사용 (SSR과 CSR 모두 가능)
const htmlContent = computed(() => {
  if (!data.value || !data.value.content) return '';

  return generateHTML(data.value.content, [
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
    CodeBlockLowlight.extend({
      addNodeView() {
        return ({ node }) => {
          const dom = document.createElement('pre');
          const code = document.createElement('code');
          code.className = `language-${node.attrs.language || 'js'}`;
          code.textContent = node.content.content[0].text as any;
          dom.appendChild(code);
          return { dom };
        };
      },
    }).configure({
      lowlight,
      defaultLanguage: 'js',
    }),

    Image,
    NodeRange.configure({ depth: 0 }),
  ]);
});

// ✅ SEO 메타태그 설정
const metaData = computed(() => ({
  title: `2rang25 - ${data.value?.title || "Default Title"}`,
  ogTitle: `2rang25 - ${data.value?.title || "Default Title"}`,
  description: data.value?.summary || "Default summary",
  ogDescription: data.value?.summary || "Default summary",
  ogImage: data.value?.thumbnail || "/default-thumbnail.jpg",
}));

useSeoMeta(metaData.value);
</script>

<style lang="scss">
/* TailwindCSS 만 사용하므로 스타일 제거 */
</style>
