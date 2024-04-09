<template>
  <div id="login_form">
    <UCard  class="h-full">
      <img src="/assets/mascort.svg" />
      <span id="text_logo">2rang25</span>
      <UInput id="user_id" type="text" placeholder="E-mail" v-model="userEmail" />
      <UInput id="user_pw" type="password" placeholder="Password" v-model="userPassword" />
      <UButton id="login" label="Login" @click="signIn" />
    </UCard>
  </div>
</template>
<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import {ref} from "vue";
import {useUserStore} from "~/store/userStore/userStore";


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
const userStore  = useUserStore()
const userEmail = ref('')
const userPassword = ref('')

const signIn = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail.value,
    password:  userPassword.value
  })

  if(data.session) { // localstorage에 세션 저장
    userStore.setSession(data.session)
    userStore.setMetaData(data.user.user_metadata)
  }else { // 실패 처리
    console.log('로그인실패')
  }

}
</script>
<style lang="scss">
#login_form {
  width: 90%;
  max-width: 370px;
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    margin: 0 auto;
    width: 90%;
    max-width: 200px;
  }
  #user_id,#user_pw {
    margin: 15px auto;
  }
  #text_logo {
    font-weight: bold;
    margin: 15px;
    display: block;
    text-align: center;
    font-size: 2rem;
  }
  #login {
    width: 100%;
    margin: 10px auto;
    padding: 10px;
    display: block;
    text-align: center;
    font-size: 1.1rem;
    font-weight: bold;
  }
}
</style>