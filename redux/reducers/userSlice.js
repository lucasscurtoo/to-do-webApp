import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { authApi } from "../api/userAuth"
import { usersApi } from "../api/users"

const userSlice = createSlice({
  name: "user",
  initialState: {
    isRedirected: false,
    isLoggedIn: false,
    username: null,
    userToken: null,
    darkmode: false,
    loading: false,
    jwtExpired: false,
  },
  reducers: {
    setRedirected: (state, action) => {
      state.isRedirected = action.payload
      state.error = { state: true, message: "Log in before" }
    },
    setJwtExpired: (state, action) => {
      state.jwtExpired = action.payload
      state.error = {
        state: true,
        message: "Your session expired, please log in again",
      }
    },
    clearUserData: (state) => {
      state.username = null
      state.userToken = null
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.setItem("theme", "light")
    },
    logOut: (state) => {
      state.isLoggedIn = false
    },
    setUserData: (state, action) => {
      state.isLoggedIn = true
      state.username = action.payload.username
      state.userToken = action.payload.userToken
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.updateUserDarkMode.matchPending,
        (state) => {
          state.loading = true
        }
      )
      .addMatcher(
        usersApi.endpoints.getUserDarkMode.matchFulfilled,
        (state, action) => {
          state.darkmode = action.payload.data.darkmode
        }
      )
      .addMatcher(
        usersApi.endpoints.updateUserDarkMode.matchFulfilled,
        (state, action) => {
          state.darkmode = action.meta.arg.originalArgs.darkmode
          state.loading = false
        }
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.register.matchFulfilled
        ),
        (state, action) => {
          const status = action.payload.status
          const username = action.meta.arg.originalArgs.username
          if (status === 200) {
            const token = action.payload.data.token
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
            state.username = username
            state.userToken = token
            state.isLoggedIn = true
            state.isRedirected = false
            state.error = null
          } else {
            state.isLoggedIn = false
            state.error = { state: true, message: action.payload.message }
          }
        }
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchRejected,
          authApi.endpoints.register.matchRejected,
          authApi.endpoints.updateUserDarkMode.matchRejected,
          authApi.endpoints.getUserDarkMode.matchRejected
        ),
        (state, action) => {
          state.error = { state: true, message: action?.payload?.data?.message }
          state.loading = false
        }
      )
  },
})

export const {
  setRedirected,
  setJwtExpired,
  clearUserData,
  logOut,
  setUserData,
} = userSlice.actions
export default userSlice.reducer
