<template>

 <img  id="logo" src="/public/ktwiz_symbol.svg" />

    <!-- <div id="search">
        <UInput v-model="userName"  type="text" color="dark" />
        <UButton color="red" label="Go!" @click="searchImage()" />
    </div> -->
    <masonry-infinite-grid
    :key="statekey"
    v-if="list.length > 0"
        class="container"
        v-bind:gap="5"
        v-on:request-append="onRequestAppend">
  <div
      class="item"
      v-for="item in items"
      :key="item.key"
      :data-grid-groupkey="item.groupKey"
    >
      <div class="thumbnail">
        <img
          v-bind:src="list[(item.key % 33) + 1]?.imgFilePath"
          alt="egjs" 
        />
      </div>
      <div class="info" style="height: 10px;">
            <!-- <span style="padding: 5px;">{{list[(item.key % 33) + 1]?.artcTitle }}</span> -->
      </div>
    </div>
        <template v-slot:placeholder="{ item }">
            <div
            class="placeholder"
                :key="item.key"
                :data-grid-groupkey="item.groupKey"
                ></div>
        </template>
  </masonry-infinite-grid>
  <div v-else >
    {{ data[0] }}
    없어 씨발!!
  </div>
</template>
<script setup lang="ts">
import { MasonryInfiniteGrid    } from "@egjs/vue3-infinitegrid";
import data from '@/public/utill/data.json'
const convertName = (name : string) => {
    return name?.replace('!','')
}

const getItems = (nextGroupKey: number, count: number)  => {
    const nextItems = []
    for (let i = 0; i < count; ++i) {
        const nextKey = nextGroupKey * count + i 
        nextItems.push({groupKey : nextGroupKey, key : nextKey })
    }
    return nextItems
}
const statekey = 1
const list = ref(data)
const items = ref(getItems(0, 50))
const userName = ref('')
const onRequestAppend = (e : any) => {
    const nextGroupKey = (+e.groupKey! || 0) + 1;
    const newItems = getItems(nextGroupKey, 50);
    items.value = [...items.value, ...newItems];
}

const searchImage = () => {
    let desiredItems = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].artcSubTitle === `${userName.value}선수!`) {
            desiredItems.push(data[i]);
        }
    }

    if (desiredItems.length > 0) {
        list.value = desiredItems
        getItems(0, 50)
    } else {
        list.value = []
    }
}

</script>
<style lang="scss">
#logo {
    max-width: 200px;
    width: 90%;
    display: block;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
}
#search {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 3%;
    display: flex;
}
.container {
    margin:  0 auto;
    max-width: 860px;
    width: 90%;
    margin-bottom: 5%;
}
.item {
    width: 40%;
    max-width: 200px;
    img {
        border-radius: 5px;
    }
}
.scrollbar { 
  overflow-x: hidden; /*  */
}

/* 스크롤바의 폭 너비 */
body::-webkit-scrollbar {
    width: 10px;  
}

body::-webkit-scrollbar-thumb {
    background: rgb(190, 6, 43); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
}

body::-webkit-scrollbar-track {
    background: rgba(53, 53, 53, 0.1);  /*스크롤바 뒷 배경 색상*/
}
</style>

