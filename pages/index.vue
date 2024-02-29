<template>
  <NuxtLayout>
    <div>
    <img src="../public/test.png" id="test" />
          <NuxtLink to="/login" id="link">
            Let's go kt wiz!!
          </NuxtLink>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import {useUserStore} from "~/store/userStore/userStore";
import {ref} from "vue";

const userStore = useUserStore()
const userInfo = ref()

</script>
<style scoped lang="scss">
#test {
 margin: 0 auto;
}
#link {
  text-align: center;
  display: block;
  margin: 0 auto;
  font-size: 5rem;
  font-weight: bold;
}

</style>
