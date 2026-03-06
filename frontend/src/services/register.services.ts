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
  if (res.ok) {
    const data = await res.json()
    return data
  }
}
