export async function deleteTask (_id: string) {
  const token = localStorage.getItem('user_token')

  const res = await fetch (`/api/tasks/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error(`Erreur suppression : ${res.status}`)
  }

  return await res.json()
}
