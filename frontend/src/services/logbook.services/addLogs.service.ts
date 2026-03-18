export async function addLog (logbook: {
  userId: string
  type: string
  description: string
  severity: string
  date: string
}) {
  const token = localStorage.getItem('user_token')
  const res = await fetch ('/api/logbook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ logbook }),
  })
  if (res.ok) {
    const data = await res.json()
    return data
  }
}
