import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/register.services'

export function useRegister () {
  const router = useRouter()
  const isError = ref(false)
  const isLoading = ref(false)

  async function doRegister (name: string, password: string, password2: string) {
    isLoading.value = true
    try {
      await register(name, password, password2)
      router.push('/login')
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
    doRegister,
    isError,
    isLoading,
  }
}
