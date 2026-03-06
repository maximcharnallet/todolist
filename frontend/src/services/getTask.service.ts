const token = localStorage.getItem('user_token')

export async function fetchTasks () {
  const res = await fetch('/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.ok) {
    const data = await res.json()
    return data
  }
}
