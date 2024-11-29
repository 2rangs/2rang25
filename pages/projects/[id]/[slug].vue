<template>
  <MainLayout>
    <TipTapViewer :post="post" />
  </MainLayout>
</template>
<script setup lang="ts">
import {getPostById} from "~/utils/api";
import MainLayout from "~/layouts/MainLayout.vue";
import TipTapViewer from "~/components/TipTapViewer.vue";

const route = useRoute()
const postId : any = ref()
const post = ref()

onMounted(async () => {
  postId.value = route.fullPath.split('/')[route.fullPath.split('/').length-2]

  post.value = await getPostById(postId.value)
})
</script>