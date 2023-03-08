import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { listsCreateList, listsDeleteList, listsGetLists } from "../api/lists"
import {
  tasksCompleteOrDecomplete,
  tasksCreateTask,
  tasksDeleteTask,
  tasksUpdateTask,
} from "../api/tasks"

export const fetchGetLists = createAsyncThunk("lists/getLists", async () => {
  const response = await listsGetLists()
  return response.data
})

export const fetchCreateList = createAsyncThunk(
  "lists/createList",
  async (newListTitle) => {
    const response = await listsCreateList(newListTitle)
    return response
  }
)

export const fetchDeleteList = createAsyncThunk(
  "lists/deleteList",
  async (listTitle) => {
    const response = await listsDeleteList(listTitle)
    return response
  }
)

export const fetchCreateTask = createAsyncThunk(
  "/tasks/createTask",
  async (values) => {
    const response = await tasksCreateTask(
      values.title,
      values.completed,
      values.description
    )
    return response
  }
)

export const fetchUpdateTask = createAsyncThunk(
  "/tasks/updateTask",
  async (values) => {
    const response = await tasksUpdateTask(
      values.title,
      values.completed,
      values.description,
      values.newDescription
    )
    return response
  }
)

export const fetchDeleteTask = createAsyncThunk(
  "/tasks/deleteTask",
  async (values) => {
    const response = await tasksDeleteTask(
      values.title,
      values.completed,
      values.description
    )
    return response
  }
)

export const fetchCompleteOrDecompleteTask = createAsyncThunk(
  "/tasks/completeOrDecompleteTask",
  async (values) => {
    const response = await tasksCompleteOrDecomplete(
      values.title,
      values.completed,
      values.description
    )
    return response
  }
)

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
    handleCompletedOrDecompletedTask: (state, action) => {
      const tasks = JSON.parse(JSON.stringify(state.tasks))
      const completedTasks = JSON.parse(JSON.stringify(state.completedTasks))
      const { completed, description } = action.payload

      if (
        !tasks.some((currentTask) => currentTask.description === description)
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
    },
    setErrorState: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetLists.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchGetLists.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.lists = defaultList
          state.noLists = true
        } else {
          state.loading = false
          state.lists = action.payload
          const tasks = []
          const completed = []
          action.payload[0].todo.map((task) => {
            if (task.completed) {
              completed.push(task)
            } else {
              tasks.push(task)
            }
          })
          state.tasks = tasks
          state.completedTasks = completed
          state.selectedList = action.payload[0]
        }
      })
      .addCase(fetchCreateList.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.lists.push({
            title: action.meta.arg,
            todo: [],
            username: localStorage.getItem("username"),
          })
        } else {
          state.error = { state: true, message: action.payload.message }
        }
      })
      .addCase(fetchDeleteList.fulfilled, (state, action) => {
        const lists = JSON.parse(JSON.stringify(state.lists))
        const title = action.meta.arg
        state.lists = lists.filter((item) => item.title !== title)
      })

      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        state.tasks.push(action.meta.arg)
      })

      .addCase(fetchUpdateTask.fulfilled, (state, action) => {
        const tasks = JSON.parse(JSON.stringify(state.tasks))
        const { completed, description, newDescription } = action.meta.arg
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
      })

      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        const tasks = JSON.parse(JSON.stringify(state.tasks))
        const { completed, description } = action.meta.arg
        state.tasks = tasks.filter((item) => item.description !== description)
      })
  },
})

export const {
  selectAList,
  createNewTask,
  handleCompletedOrDecompletedTask,
  setErrorState,
} = todoSlice.actions
export default todoSlice.reducer
