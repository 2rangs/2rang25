<template>
  <client-only>
    <div class="lg:fixed lg:top-52 lg:flex lg:flex-col xl:gap-5">
      <template v-if="tocItems.length === 0">
        <ToCEmptyState />
      </template>
      <template v-else>
        <ToCItem
            v-for="(item, i) in tocItems"
            :key="item.id"
            :item="item"
            :index="i + 1"
            @item-click="onItemClick"
        />
      </template>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ToCEmptyState from './ToCEmptyState.vue';
import ToCItem from './ToCItem.vue';

// HTML 문자열을 props로 받음
const props = defineProps({
  html: {
    type: String,
    default: '',
  },
});

// 현재 활성화된 목차 항목의 id
const activeId = ref('');

// HTML 문자열 내의 h2 태그를 파싱하여 목차 항목(tocItems) 생성
const tocItems = computed(() => {
  if (!props.html) return [];
  let headings: any[] = [];

  if (process.client) {
    // 클라이언트에서는 DOMParser 사용
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.html, 'text/html');
    headings = Array.from(doc.querySelectorAll('h2'));
  } else {
    // 서버에서는 cheerio 사용 (npm install cheerio 필요)
    const cheerio = require('cheerio');
    const $ = cheerio.load(props.html);
    headings = $('h2').toArray();
  }

  return headings.map((heading: any, index: number) => {
    let id = '';
    let title = '';
    if (process.client) {
      id = heading.getAttribute('id');
      title = heading.textContent.trim();
    } else {
      // cheerio 요소는 $(heading)로 감싸서 처리
      const $heading = require('cheerio')(heading);
      id = $heading.attr('id');
      title = $heading.text().trim();
    }
    // id가 없는 경우 자동 생성
    if (!id) {
      id = 'toc-item-' + (index + 1);
    }
    return { id, title, isActive: activeId.value === id };
  });
});

// 목차 항목 클릭 핸들러
const onItemClick = (event: Event, id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  activeId.value = id;

  // URL 해시 업데이트
  if (history.pushState) {
    history.pushState(null, '', `#${id}`);
  }

  // 해당 요소로 부드럽게 스크롤 이동
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY,
    behavior: 'smooth',
  });
};
</script>
