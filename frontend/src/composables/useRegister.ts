import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/auth.services/register.services'

export function useRegister () {
  const router = useRouter()
  const isError = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)

  async function doRegister (name: string, password: string, password2: string) {
    if (!name.trim() || !password.trim()) {
      isError.value = true
      errorMessage.value = 'Veuillez remplir tous les champs'
      return
    }
    isLoading.value = true
    try {
      await register(name, password, password2)
      router.push('/login')
    } catch (error: any) {
      isError.value = true
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }
  return {
    doRegister,
    isError,
    errorMessage,
    isLoading,
  }
}
