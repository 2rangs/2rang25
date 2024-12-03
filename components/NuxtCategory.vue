<template>
  <div class="h-full sticky w-48">
    <UNavigationTree :links="mapContentNavigation(categories)" />
  </div>
</template>

<script setup lang="ts">
import {useNavigationTree} from "~/composables/useCategoryTree";
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";
import type {NavItem} from "@nuxt/content";
const categories = ref<NavItem[]>([])
onMounted(async () => {
  if( localStorage.getItem('categories') ) {
    categories.value = JSON.parse(localStorage.getItem('categories') as string)
  } else {
    categories.value = await  useNavigationTree(supabase)
  }
})
</script>

<style scoped lang="scss">
*  {

}
</style>