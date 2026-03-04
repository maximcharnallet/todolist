export async function signin(name: string, password: string) {
  const res = await fetch("/api/check_login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  })
  if (res.ok) {
    const data = await res.json()
    localStorage.setItem("user_token", data.token)
  } else {
    throw new Error("Erreur de connexion")
  }
}
