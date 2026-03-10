import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { taskStore } from '@/store/task.store'

export function useLogout () {
  const router = useRouter()
  const store = taskStore()
  const isError = ref(false)
  const isLoading = ref(false)

  async function doLogout () {
    isLoading.value = true
    try {
      store.$reset()
      localStorage.removeItem('user_token')
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
    doLogout,
    isError,
    isLoading,
  }
}
