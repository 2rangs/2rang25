<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 mb-2">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
              type="submit"
              class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Login
          </button>
        </div>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useNuxtApp } from '#imports'

const email = ref<string>('')
const password = ref<string>('')
const error = ref<string | null>(null)
const router = useRouter()

const login = async () => {
  error.value = null
  const { error: loginError } = await supabase?.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (loginError) {
    error.value = loginError.message
  } else {
    // Redirect to home or another page
    await router.push('/')
  }
}
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
