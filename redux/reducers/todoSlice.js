import { createSlice } from "@reduxjs/toolkit"
import { listsApi } from "../api/lists"
import { tasksApi } from "../api/tasks"

const defaultList = [
  {
    title: "My list",
    todo: [],
    username:
      typeof window !== "undefined" ? localStorage.getItem("username") : null,
  },
]

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: true,
    error: null,
    lists: defaultList,
    currentList: defaultList,
    darkMode: false,
  },
  reducers: {
    selectAList: (state, action) => {
      state.currentList = action.payload
    },
    setErrorState: (state, action) => {
      state.error = action.payload
    },
    clearErrorState: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        listsApi.endpoints.getUserLists.matchFulfilled,
        (state, action) => {
          const lists = action.payload.data
          if (lists != undefined) {
            state.loading = false
            state.lists = lists
            state.currentList = lists[0]
          }
        }
      )
      .addMatcher(
        listsApi.endpoints.createUserList.matchFulfilled,
        (state, action) => {
          state.lists.push({
            title: action.meta.arg.originalArgs.title,
            todo: [],
            username: localStorage.getItem("username"),
          })
        }
      )
      .addMatcher(
        listsApi.endpoints.deleteUserList.matchFulfilled,
        (state, action) => {
          const lists = JSON.parse(JSON.stringify(state.lists))
          const title = action.meta.arg.originalArgs.title
          state.lists = lists.filter((item) => item.title !== title)
        }
      )
      .addMatcher(
        tasksApi.endpoints.createTask.matchFulfilled,
        (state, action) => {
          const { title, completed, description } = action.meta.arg.originalArgs
          const lists = JSON.parse(JSON.stringify(state.lists))
          lists.map((elem, index) => {
            elem.title === title
              ? state.lists[index].todo.push({ completed, description })
              : elem.todo
          })
          state.currentList.todo.push({ completed, description })
        }
      )
      .addMatcher(
        tasksApi.endpoints.updateTask.matchFulfilled,
        (state, action) => {
          const lists = JSON.parse(JSON.stringify(state.lists))
          const currentList = JSON.parse(JSON.stringify(state.currentList))
          const { completed, description, newDescription, title } =
            action.meta.arg.originalArgs
          const tasks = currentList.todo
          const listIndex = lists.findIndex((list) => list.title === title)
          lists[listIndex].todo.map((task, index) =>
            task.description === description
              ? (tasks[index] = {
                  completed,
                  description: newDescription,
                })
              : task
          )
          state.lists[listIndex].todo = tasks
          state.currentList.todo = tasks
        }
      )
      .addMatcher(
        tasksApi.endpoints.deleteTask.matchFulfilled,
        (state, action) => {
          const lists = JSON.parse(JSON.stringify(state.lists))
          const currentList = JSON.parse(JSON.stringify(state.currentList))
          const { description, title } = action.meta.arg.originalArgs
          const tasks = currentList.todo
          const listIndex = lists.findIndex((list) => list.title === title)
          state.lists[listIndex].todo = tasks.filter(
            (item) => item.description !== description
          )
          state.currentList.todo = tasks.filter(
            (item) => item.description !== description
          )
        }
      )
      .addMatcher(
        tasksApi.endpoints.completeOrDecompleteTask.matchFulfilled,
        (state, action) => {
          const lists = JSON.parse(JSON.stringify(state.lists))
          const { title, completed, description } = action.meta.arg.originalArgs
          const listIndex = lists.findIndex((list) => list.title === title)
          lists[listIndex].todo.map((item, index) =>
            item.description === description
              ? ((state.lists[listIndex].todo[index].completed = !completed),
                (state.currentList.todo[index].completed = !completed))
              : item
          )
        }
      )
  },
})

export const { selectAList, setErrorState, clearErrorState } = todoSlice.actions
export default todoSlice.reducer
