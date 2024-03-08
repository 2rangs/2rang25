<template>
  <MainLayout >
    <div id="main">
<!--      <img alt="mainImage" id="title" src="/public/assets/test.jpg" />-->
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
</script>
<style scoped lang="scss">
#main {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 5px;
  padding: 10px;
  min-height: calc(100vh - 50px);
}
#title{
  display: block;
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
}
#card {
  background-color: crimson;
  border-radius: 5px;
  margin: 5px;
  height: 100px;
  transition: all 0.5s ease-out;
}

</style>
