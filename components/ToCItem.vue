<template>
  <div
      :class="[
      'pl-3 border-l-2 transition-all duration-300 ease-in-out',
      item.isActive
        ? 'border-primary'
        : 'border-gray-300 bg-transparent',
      item.isScrolledOver && '',
    ]"
      :style="{ '--level': item.level }"
  >
    <a
        :href="'#' + item.id"
        @click.prevent="onItemClick"
        :data-item-index="item.itemIndex"
        class="block hover:text-gray-400"
    >
      {{ item.textContent }}
    </a>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

// Emits
const emit = defineEmits(['item-click']);

// Emit the item-click event to parent
const onItemClick = (event: Event) => {
  emit('item-click', event, props.item.id);
};
</script>
