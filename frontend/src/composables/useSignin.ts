import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signin } from '@/services/auth.services/auth.service'

export function useSignin () {
  const router = useRouter()
  const isError = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)

  async function doSignin (name: string, password: string) {
    isError.value = false
    if (!name.trim() || !password.trim()) {
      isError.value = true
      errorMessage.value = 'Veuillez remplir tous les champs'
      return
    }
    isLoading.value = true
    try {
      await signin(name, password)
      router.push('/accueil')
    } catch (error: any) {
      isError.value = true
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }
  return {
    doSignin,
    isError,
    errorMessage,
    isLoading,
  }
}
