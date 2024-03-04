<template>
  <MainLayout >
    <div id="main">
      <img id="title" src="/public/assets/nero.jpg" />
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
</script>
<style scoped lang="scss">
#main {
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  min-height: calc(100vh - 50px);
}
#title{
  display: block;
  margin: 0 auto;
}

</style>
