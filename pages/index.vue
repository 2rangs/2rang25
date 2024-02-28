<template>
  <div>
    Welcom to Nuxt 3!!
<!--    <NuxtLink to="/login" >-->
<!--      go to Login-->
<!--    </NuxtLink>-->
  </div>
</template>
<script lang="ts" setup>
import {useUserStore} from "~/store/userStore/userStore";
import {ref} from "vue";

const userStore = useUserStore()
const userInfo = ref()

</script>
<style scoped>
</style>
