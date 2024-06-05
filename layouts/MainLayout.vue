<template>
 <div id="wrapper">
    <NuxtHeader />
    <slot />
    <NuxtFooter />
  </div>
</template>
<script setup lang="ts">
import NuxtFooter from '~/components/NuxtFooter.vue';
import NuxtHeader from '~/components/NuxtHeader.vue';
</script>
<style scoped lang="scss">
#wrapper {
  margin: 5px;
}
</style>