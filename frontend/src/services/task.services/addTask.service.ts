export async function addTask (newTask: string) {
  const token = localStorage.getItem('user_token')
  const res = await fetch ('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title: newTask }),
  })
  if (res.ok) {
    const data = await res.json()
    return data
  }
}
