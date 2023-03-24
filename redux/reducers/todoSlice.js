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
    loading: false,
    error: null,
    lists: defaultList,
    selectedList: defaultList,
    tasks: [],
    completedTasks: [],
    darkMode: false,
  },
  reducers: {
    selectAList: (state, action) => {
      const tasks = []
      const completed = []
      action.payload.todo.map((task) => {
        if (task.completed) {
          completed.push(task)
        } else {
          tasks.push(task)
        }
      })
      state.tasks = tasks
      state.completedTasks = completed
      state.selectedList = action.payload
    },
    setErrorState: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(listsApi.endpoints.getUserLists.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(
        listsApi.endpoints.getUserLists.matchFulfilled,
        (state, action) => {
          const lists = action.payload.data
          if (lists === undefined) {
            state.lists = defaultList
          } else {
            state.loading = false
            state.lists = lists
            const tasks = []
            const completed = []
            lists[0].todo.map((task) => {
              if (task.completed) {
                completed.push(task)
              } else {
                tasks.push(task)
              }
            })
            state.tasks = tasks
            state.selectedList = lists[0]
          }
        }
      )
      .addMatcher(
        listsApi.endpoints.createUserList.matchFulfilled,
        (state, action) => {
          if (action.payload.status === 200) {
            state.lists.push({
              title: action.meta.arg.originalArgs.title,
              todo: [],
              username: localStorage.getItem("username"),
            })
          } else {
            state.error = { state: true, message: action.payload.message }
          }
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
          const { completed, description } = action.meta.arg.originalArgs
          state.tasks.push({ completed, description })
        }
      )
      .addMatcher(
        tasksApi.endpoints.updateTask.matchFulfilled,
        (state, action) => {
          const tasks = JSON.parse(JSON.stringify(state.tasks))
          const { completed, description, newDescription } =
            action.meta.arg.originalArgs
          const oldDescIndex = tasks.findIndex(
            (elem) => elem.description === description
          )
          if ((oldDescIndex) => 0) {
            tasks[oldDescIndex] = {
              completed: completed,
              description: newDescription,
            }
            state.tasks = tasks
          }
        }
      )
      .addMatcher(
        tasksApi.endpoints.deleteTask.matchFulfilled,
        (state, action) => {
          const tasks = JSON.parse(JSON.stringify(state.tasks))
          const completedTasks = JSON.parse(
            JSON.stringify(state.completedTasks)
          )
          const { completed, description } = action.meta.arg.originalArgs
          completed
            ? (state.completedTasks = completedTasks.filter(
                (item) => item.description !== description
              ))
            : (state.tasks = tasks.filter(
                (item) => item.description !== description
              ))
        }
      )
      .addMatcher(
        tasksApi.endpoints.completeOrDecompleteTask.matchFulfilled,
        (state, action) => {
          const tasks = JSON.parse(JSON.stringify(state.tasks))
          const completedTasks = JSON.parse(
            JSON.stringify(state.completedTasks)
          )
          const { completed, description } = action.meta.arg.originalArgs

          if (
            !tasks.some(
              (currentTask) => currentTask.description === description
            )
          ) {
            completedTasks.map((compTask) => {
              if (compTask.description === description) {
                state.tasks.push({
                  completed: !completed,
                  description: description,
                })
                state.completedTasks = completedTasks.filter(
                  (item) => item.description !== description
                )
              }
            })
          } else {
            tasks.map((task) => {
              if (task.description === description) {
                state.completedTasks.push({
                  completed: !completed,
                  description: description,
                })
                state.tasks = tasks.filter(
                  (item) => item.description !== description
                )
              }
            })
          }
        }
      )
  },
})

export const { selectAList, setErrorState } = todoSlice.actions
export default todoSlice.reducer
