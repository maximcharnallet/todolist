export async function signin (name: string, password: string) {
  const res = await fetch('/api/check_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      password,
    }),
  })

  const data = await res.json()

  if (res.ok) {
    localStorage.setItem('user_token', data.token)
    return data
  } else {
    throw new Error(data.error || 'Erreur de connexion')
  }
}
