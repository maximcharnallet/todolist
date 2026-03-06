const token = localStorage.getItem('user_token')

export async function deleteTask (id: string) {
  await fetch (`/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
