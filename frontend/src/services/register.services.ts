export async function register (name: string, password: string, password2: string) {
  const res = await fetch ('/api/check_register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      password,
      password2,
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Une erreur est survenue')
  }
  return data
}
