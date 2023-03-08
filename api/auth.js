const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const authRequest = async (username, password, route) => {
  return await fetch(`${BASE_URL}/auth${route}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((response) => response.json())
}
