<template>
  <div
      class="hidden xl:fixed xl:top-52 xl:flex xl:flex-col xl:gap-4"
      :class="{
      'xl:right-8': screenWidth >= 1440 && screenWidth < 1536,
      '2xl:right-24': screenWidth >= 1536,
    }"
  >
    <template v-if="items.length === 0">
      <ToCEmptyState />
    </template>
    <template v-else>
      <ToCItem
          v-for="(item, i) in items"
          :key="item.id"
          :item="item"
          :index="i + 1"
          @item-click="onItemClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { TextSelection } from '@tiptap/pm/state';
import ToCEmptyState from './ToCEmptyState.vue';
import ToCItem from './ToCItem.vue';
// Reactive screen width
const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

// Cleanup event listener
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});
// Props 정의
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  editor: {
    type: Object,
    required: true,
  },
});

// 목차 클릭 핸들러
const onItemClick = (event: Event, id: string) => {
  if (!props.editor) return;

  // 에디터에서 해당 ID로 포커스 설정
  const element = props.editor.view.dom.querySelector(`[data-toc-id="${id}"]`);
  if (!element) return;

  const pos = props.editor.view.posAtDOM(element, 0);
  const tr = props.editor.view.state.tr;

  // 텍스트 선택 및 포커스
  tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
  props.editor.view.dispatch(tr);
  props.editor.view.focus();

  // URL 해시 업데이트
  if (history.pushState) {
    history.pushState(null, '', `#${id}`);
  }

  // 스크롤 이동
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY,
    behavior: 'smooth',
  });

  // 상태 업데이트
  updateActiveState(id);
};

// 활성 상태 업데이트 함수
const updateActiveState = (id: string) => {
  props.items.forEach((item: any) => {
    item.isActive = item.id === id;
  });
};
</script>
