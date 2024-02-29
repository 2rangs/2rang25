<template>
  <NuxtLayout>
    <div>
    <img src="../public/ktwiz_emblem.svg" id="test" />
          <NuxtLink to="/ktwiz" id="link">
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
  width: 90%;
  max-width: 330px;
  margin: 0 auto;
  margin-top: 5%;
}
#link {
  text-align: center;
  display: block;
  margin: 0 auto;
  font-size: 5rem;
  font-weight: bold;
}

</style>
