import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signin } from '@/services/auth.service'

export function useSignin () {
  const router = useRouter()
  const isError = ref(false)
  const isLoading = ref(false)

  async function doSignin (name: string, password: string) {
    isLoading.value = true
    try {
      await signin(name, password)
      router.push('/accueil')
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    } finally {
      isLoading.value = false
    }
  }
  return {
    doSignin,
    isError,
    isLoading,
  }
}
