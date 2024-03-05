<template>
  <div id="login_form">
      <UInput type="text" placeholder="E-mail" v-model="userEmail" />
      <UInput type="password" placeholder="Password" v-model="userPassword" />
      <UButton label="Button" @click="signIn" />

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

}
</style>