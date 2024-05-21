<template>
<MainLayout>

  <UCard id="main">
    <template #header>
      <div class="flex items-center justify-between text-primary">
        <div class="flex items-center gap-x-2">
          <UIcon
              name="i-heroicons-chat-bubble-left-right"
              class="w-6 h-6 font-semibold"
          />
          <div class="text-primary font-semibold text-center text-xl">Chat 찍</div>
          <span>
                    {{ currentRoom }}
          </span>
        </div>
        <UButton
            label="나가기"
            @click="() => navigateTo('/lobby')"
        />

      </div>

    </template>
    <div>
      <div id="chatArea"  class="overflow-y-auto flex-1">
        <!-- Chat -->
        <div
            class="bg-transparent w-full mb-3 flex"
            v-for="(chat, i) in chats"
            :key="i"
            :class="{
            'justify-center': chat.username === 'NuxtChatapp Admin',
            'justify-end': chat.username === route.query.username,
            'justify-start': chat.username !== route.query.username,
          }"
        >
          <span id="info" v-if="chat.username === 'NuxtChatapp Admin'">
               {{ chat.text }}
          </span>
          <div v-else
               id="chat"
               class="rounded-md"
               :class="{
              'bg-primary/20': chat.username === route.query.username,
              'bg-green-300': chat.username !== route.query.username,
            }"
          >
            <div class="flex items-center gap-x-3">
              <!--              v-if="chat.username !== route.query.username"-->
              <span>
                {{ chat.username.split('|')[0] }} - {{chat.time}}
              </span>
            </div>
            <div class="mt-1 text-base">
              {{ chat.text }}
            </div>
            <img :src="test">
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <form @submit.prevent="sendMessage">
        <div style="display:flex;">
          <UInput
              style="max-width: 1050px; width: 75vw; line-height: 30px; !important;"
              v-model="message"
              placeholder="Enter your message...."
          />
          <UButton
              icon="i-heroicons-paper-airplane"
              size="xl"
              color="primary"
              variant="solid"
              :trailing="false"
              type="submit"
              style="margin: 0 auto"
              @click.prevent="sendMessage"
              @submit.prevent="sendMessage"
          />
        </div>
      </form>
    </template>
  </UCard>

</MainLayout>
</template>

<script setup lang="ts">
import { io, type Socket } from 'socket.io-client'
import MainLayout from "~/layouts/MainLayout.vue";
import OpenAI from 'openai/index.mjs';
const route = useRoute();

interface Chat {
  username: string;
  text: string;
  time: string;
  room?: string;
}
type User = {
  id: string;
  username: string;
  room: string;
};
const message = ref('');
const chats = ref<Chat[]>([]);
const users = ref<User[]>([]);
const socket = ref<Socket>();
const currentRoom = ref('');
const sendMessage = async () => {
  if(message.value != ''){
    socket.value?.emit('chatMessage', message.value);
    await nextTick(() => message.value = '');
  }
  dalle()
}
const test = ref()
const dalle = async () => {

  const openai = new OpenAI({
    apiKey: 'sk-proj-v8FSZumGJpTuUOhdJ3CET3BlbkFJCfyKboGJ6YpsGK16m5IN',
    dangerouslyAllowBrowser: true
  });
  try {

    const image = await openai.images.generate({ model: "dall-e-3", prompt: 'so great sexy girl', n: 1, size: "1024x1024" });
    console.log(image.data[0].url);

    test.value = image.data[0].url
    // 모델의 응답에서 답변 가져오기

  } catch (error) {
    console.error('ChatGPT 요청 중 오류:', error);
    throw error;
  }
}

onMounted(() => {
  const { username, room } = route.query as Partial<Chat>;
  if (!username || !room) {
    navigateTo('/lobby');
  }
  socket.value = io({
    path: '/api/socket.io'
  })
//   Join ChatRoom
socket.value.emit('joinRom', { username, room })
socket.value.on('message', (response: Chat) => {
    chats.value.push(response)
})
socket.value.on('roomUsers', (response: { room: string, users: User[] }) => {

    currentRoom.value = response.room
    users.value = response.users
})

});
onBeforeUnmount(() => {
    console.log('Disconnect Block');
    socket.value?.disconnect();
})
</script>

<style scoped lang="scss">
#main {
  width: 95vw;
  max-width: 1200px;
  height: 95%;
  margin: 20px auto;
}
#info{
  max-width: 500px;
  width: 90%;
  letter-spacing : 1px;
  text-align: center;
  font-size: 1rem;
  background-color: rgba(128, 128, 128, 0.15);
  padding: 5px;
  border-radius: 10px;
}
#chat{
  width: 50%;
  max-width: 450px;
  padding: 15px;
}
#chatArea{
  height: 65vh;
}
</style>
