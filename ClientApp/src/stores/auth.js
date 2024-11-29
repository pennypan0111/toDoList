import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)

  function login() {
    isLoggedIn.value = true
  }

  return { isLoggedIn, login }
})
