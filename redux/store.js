import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/api"
import todoReducer from "./reducers/todoSlice"
import userReducer from "./reducers/userSlice"

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    todoReducer: todoReducer,
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(api.middleware),
})
