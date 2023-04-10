import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/api"
import todoReducer from "./reducers/todoSlice"
import userReducer from "./reducers/userSlice"
import { authMiddleware, tokenErrorHandler } from "../helpers/functions"
import next from "next"

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    todoReducer: todoReducer,
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(api.middleware, tokenErrorHandler),
})
