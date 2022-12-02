const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const listsCreateList = async (newListTitle) => {
  return await fetch(`${BASE_URL}/lists/createList`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
    body: JSON.stringify({
     title: newListTitle,
     username: localStorage.getItem("username")
    }),
  }).then((response) => response.json());
};

export const listsGetLists = async () => {
  const username = localStorage.getItem("username")
  return await fetch(`${BASE_URL}/lists/getUserLists?username=${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
  }).then((response) => response.json());
}
