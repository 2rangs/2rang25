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
        <UCard class="cursor-pointer hover:bg-gray-50  row-span-2 col-span-2" @click="movePage('projects')">
          <span class="font-extrabold text-3xl">
            Project
          </span>
        </UCard>
        <UCard  class="cursor-pointer hover:bg-gray-50 col-span-2 row-span-1" @click="movePage('gallary')">
          <span class="font-extrabold text-3xl">
           Gallary
         </span>
        </UCard>
        <UCard class="cursor-pointer hover:bg-gray-50 col-span-1" @click="movePage('blogs')">
          <span class="font-extrabold text-3xl">
           Blogs
         </span>
        </UCard>
        <UCard class="cursor-pointer hover:bg-gray-50 col-span-1">
          <span class="font-extrabold text-3xl">
           About
         </span>
        </UCard>

      </div>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

const router = useRouter()
const movePage = (toPage : string) => {
  router.push(`/${toPage}`)
}
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
  min-height: calc(100vh - 50px);
}
#center_info{
  margin: 15px;
  height: 45vh;
}
#card_nav{
  margin: 15px;
  height: 40vh;
}
</style>
