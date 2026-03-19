export async function addLog (logbook: {
  description: string
  date: string
  // type: string
  // severity: string
}) {
  const token = localStorage.getItem('user_token')
  const res = await fetch ('/api/logbook/summary', {
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
