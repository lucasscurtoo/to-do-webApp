import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/userAuth"
import todoReducer from "./reducers/todoSlice"
import userReducer from "./reducers/userSlice"

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    todoReducer: todoReducer,
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})
