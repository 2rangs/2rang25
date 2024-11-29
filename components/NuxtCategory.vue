<template>
  <div class="h-full sticky">
    <UNavigationTree :links="mapContentNavigation(categories)" />
  </div>
</template>

<script setup lang="ts">

import {useNavigationTree} from "~/composables/useCategoryTree";
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";
import type {NavItem} from "@nuxt/content";
const categories = ref<NavItem[]>([])
const route = useRoute()
onMounted(async () => {
  categories.value = await useNavigationTree(supabase)
})
</script>

<style scoped lang="scss">
*  {

}
</style>