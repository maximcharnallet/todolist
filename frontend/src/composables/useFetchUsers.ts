import { ref } from 'vue'
import { allUsers, type UserResponse } from '@/services/auth.services/users.service'

export function useFetchUsers () {
  const users = ref<UserResponse[]>([])
  const isError = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)

  async function doFetchUsers () {
    try {
      isLoading.value = true
      users.value = await allUsers()
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    doFetchUsers,
    users,
    isError,
    errorMessage,
    isLoading,
  }
}
