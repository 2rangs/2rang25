<template>
<MainLayout>
  <div id="container" style="height: 85vh; position: relative">
    <UCard id="child">
      <template #header>
        <div class="flex items-center justify-center gap-x-3 text-primary">
          <UIcon
              name="i-heroicons-chat-bubble-left-right"
              class="w-9 h-9 font-semibold"
          />
          <div class="text-primary font-semibold text-center text-3xl">Chat 찍</div>
        </div>
      </template>

      <UForm :state="state" @submit="onSubmit" class="space-y-6">
        <UFormGroup label="Username" name="username">
          <UInput v-model="state.username" />
        </UFormGroup>

        <UFormGroup label="Room" name="room">
          <USelect v-model="state.room" :options="rooms" />
        </UFormGroup>

        <UButton type="submit" size="xl" block :disabled="!state.username || !state.room">
          입 장
        </UButton>
      </UForm>
    </UCard>
  </div>
</MainLayout>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import MainLayout from "~/layouts/MainLayout.vue";
const rooms = ['global'];
const state = reactive({
  username: '',
  room: rooms[0],
});
const time = Date.now()
async function onSubmit(event: FormSubmitEvent<any>) {
  navigateTo(`/chat/?username=${state.username}|${time}&room=${state.room}`);
}
</script>

<style scoped>

#child{
  width: 90%;
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
