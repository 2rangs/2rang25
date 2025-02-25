<template>
  <MainLayout>

    <!-- 제목 영역 -->
    <div v-if="post?.title && post?.thumbnail" class="relative w-full mb-12">
      <div class="relative w-full h-[400px] overflow-hidden rounded-xl">
        <img :src="post.thumbnail" alt="thumbnail" class="w-full h-full object-cover object-center" />
        <!-- 어둡기를 높인 그라데이션 오버레이 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
          <h1 class="text-4xl sm:text-5xl font-bold text-white drop-shadow-xl">
            {{ post.title }}
          </h1>
          <div class="mt-2 flex items-center text-sm text-gray-200 drop-shadow-md">
            <span>{{ dateConvert(post.created_at) }}</span>
            <span class="mx-2">|</span>
            <span>by 2rang25</span>
          </div>
        </div>
      </div>
    </div>


    <!-- 본문 영역 -->
    <div class="min-h-screen max-w-7xl mx-auto p-4">
      <div v-if="post" v-html="htmlContent" class="prose dark:prose-invert prose-lg"></div>
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    </div>
    <!-- 좋아요 및 주변 글 -->
    <div class="mt-12 space-y-6">
      <NuxtLike v-if="post?.id" :post_id="post.id" :post_like="post.likes" />
      <NuxtSurround v-if="post?.category_id" :category="post.category_id" />
      <NuxtGiscus />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { dateConvert, getPostByTitle } from '#imports';
import MainLayout from '~/layouts/MainLayout.vue';
import { generateHTML, Extensions } from '@tiptap/html';
import Image from '@tiptap/extension-image';
import { Text } from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Document } from '@tiptap/extension-document';
import Blockquote from '@tiptap/extension-blockquote';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import NodeRange from '@tiptap-pro/extension-node-range';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import c from 'highlight.js/lib/languages/c';
import 'highlight.js/styles/github.css';
import { createLowlight } from 'lowlight';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Link } from '@tiptap/extension-link';
import { Strike } from '@tiptap/extension-strike';
import NuxtLike from '~/components/NuxtLike.vue';

// ✅ URL에서 slug 추출
const route = useRoute();
const slug = computed(() => {
  return decodeURIComponent((route.params.slug as string) || '').replaceAll('-', ' ');
});

// ✅ 함수 호출로 데이터 가져오기 (useAsyncData + 함수 호출)
const { data: post, error } = await useAsyncData(`post-${slug.value}`, () => {
  return getPostByTitle(slug.value); // API 호출이 아닌 함수 호출
});

// ✅ TipTap의 generateHTML 사용
const htmlContent = computed(() => {
  if (!post.value?.content) return '';
// ✅ Lowlight 설정
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

  const extensions: Extensions = [
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
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'js',
    }),
    Image,
  ];

  if (process.client) {
    extensions.push(NodeRange.configure({ depth: 0 }));
  }

  return generateHTML(post.value.content, extensions);
});
// ✅ SEO 메타태그 설정
const metaData = computed(() => ({
  title: `2rang25 - ${post.value?.title || 'Default Title'}`,
  ogTitle: `2rang25 - ${post.value?.title || 'Default Title'}`,
  description: post.value?.summary || 'Default summary',
  ogDescription: post.value?.summary || 'Default summary',
  ogImage: post.value?.thumbnail || '/default-thumbnail.jpg',
}));

useSeoMeta(metaData.value);
</script>

<style lang="scss">
/* TailwindCSS 만 사용하므로 스타일 제거 */
</style>
