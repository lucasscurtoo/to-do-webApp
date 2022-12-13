const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const tasksCreateTask = async (title, completed, description) => {
  return await fetch(`${BASE_URL}/tasks/createTask`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      title: title,
      completed: completed,
      description: description,
      username: username,
    }),
  }).then((response) => response.json())
}

export const tasksUpdateTask = async (
  title,
  completed,
  description,
  newDescription
) => {
  return await fetch(`${BASE_URL}/tasks/updateTask`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      title: title,
      completed: completed,
      description: description,
      newDescription: newDescription,
      username: username,
    }),
  }).then((response) => response.json())
}

export const tasksDeleteTask = async (title, completed, description) => {
  return await fetch(`${BASE_URL}/tasks/deleteTask`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      title: title,
      completed: completed,
      description: description,
      username: username,
    }),
  }).then((response) => response.json())
}

export const tasksCompleteOrDecomplete = async (
  title,
  completed,
  description
) => {
  return await fetch(`${BASE_URL}/tasks/completeOrDecompleteTask`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      title: title,
      completed: completed,
      description: description,
      username: username,
    }),
  }).then((response) => response.json())
}
