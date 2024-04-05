<template>
  <MainLayout >
    <div id="main">
      <div id="center_info">
        <UCard  class="h-full">
          <div>
            <img src="/assets/mascort.svg" class="float-right" />
          </div>
        </UCard>
      </div>
      <div id="card_nav"  class="grid grid-cols-4 grid-rows-2 gap-3">
        <UCard class="cursor-pointer hover:bg-gray-50  row-span-2 col-span-2">
          <span class="font-extrabold text-4xl">
            Project
          </span>
        </UCard>
        <UCard  class="cursor-pointer hover:bg-gray-50 col-span-2 row-span-1">
          <span class="font-extrabold text-4xl">
           Blog
         </span>
        </UCard>
        <UCard class="cursor-pointer hover:bg-gray-50 col-span-2">
          <span class="font-extrabold text-4xl">
           About
         </span>
        </UCard>

      </div>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

</script>
<style scoped lang="scss">
span{
  font-family: 'NanumSquareNeo-extrabold';
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
#main {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5px;
  padding: 10px;
  min-height: calc(100vh - 50px);
}
#title{
  display: block;
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
}
#center_info{
  margin: 15px;
  height: 45vh;
}
#card_nav{
  margin: 15px;
  height: 40vh;
}
#card {
  background-color: crimson;
  border-radius: 5px;
  margin: 5px;
  height: 100px;
  transition: all 0.5s ease-out;
}

</style>
