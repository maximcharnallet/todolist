export async function fetchLogbook () {
  const token = localStorage.getItem('user_token')
  const res = await fetch('/api/logbook/summary', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.ok) {
    const data = await res.json()
    console.log('data :', data)
    return data
  }
}
