const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const usersGetUserDarkMode = async() => {
    const username = localStorage.getItem("username")
    return await fetch(`${BASE_URL}/users/getUserDarkMode?username=${username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
    }).then((response) => response.json());
} 


export const usersUpdateUserDarkMode = async(darkmodeState) => {
  const username = localStorage.getItem("username")
  return await fetch(`${BASE_URL}/users/updateUserDarkMode`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body:  JSON.stringify({
        username: username,
        darkmode: darkmodeState
      })
  }).then((response) => response.json());
} 


