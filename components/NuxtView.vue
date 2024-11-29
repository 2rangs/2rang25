<template>
<div class="max-w-5xl m-auto">
  {{post}}
  asdf
</div>
</template>

<script setup lang="ts">
import {getPostById} from "~/utils/api";

const route = useRoute()
const postId : any = ref()
const post = ref()
onMounted(async () => {
  postId.value = route.fullPath.split('/')[route.fullPath.split('/').length-2]

  post.value = await getPostById(postId.value)
})
</script>

<style scoped lang="scss">
*  {

}
</style>