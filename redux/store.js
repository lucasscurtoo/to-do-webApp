import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { api } from "./api/api"
import todoReducer from "./reducers/todoSlice"
import userReducer from "./reducers/userSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      todoReducer: todoReducer,
      userReducer: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(api.middleware),
  })

export const wrapper = createWrapper(makeStore)
