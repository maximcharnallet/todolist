export interface UserResponse {
  name: string
}
export async function allUsers (): Promise<UserResponse[]> {
  const token = localStorage.getItem('user_token')
  const res = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Impossible de récupérer les utilisateurs')
  }

  return res.json()
}
