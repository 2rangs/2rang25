<template>
  <div class="h-full sticky w-48">
    <ClientOnly>
      <UNavigationTree :links="mapContentNavigation(categories)" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {useNavigationTree} from "~/composables/useCategoryTree";
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";
import type {NavItem} from "@nuxt/content";


const categories = ref<any[]>([])
onBeforeMount(async () => {
  categories.value = JSON.parse(localStorage.getItem('categories') as string)
})
</script>

<style scoped lang="scss">
*  {

}
</style>