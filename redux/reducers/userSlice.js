import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authRequest } from "../../api/auth"
import { usersGetUserDarkMode, usersUpdateUserDarkMode } from "../../api/users"

export const fetchAuthRequest = createAsyncThunk(
  "/auth/authRequest",
  async (values) => {
    const response = await authRequest(
      values.username,
      values.password,
      values.route
    )
    return response
  }
)

export const fetchGetUserDarkMode = createAsyncThunk(
  "users/getUserDarkMode",
  async () => {
    const response = await usersGetUserDarkMode()
    return response.data
  }
)

export const fetchUpdateUserDarkMode = createAsyncThunk(
  "users/updateUserDarkMode",
  async (darkmodeState) => {
    const response = await usersUpdateUserDarkMode(darkmodeState)
    return response
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    isRedirected: false,
    isLoggedIn: false,
    username: null,
    userToken: null,
    darkmode: false,
    loading: false,
  },
  reducers: {
    userLogged: (state, action) => {
      const { username, token } = action.payload
      state.username = username
      state.isLoggedIn = true
      state.userToken = token
      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
    },
    setRedirected: (state, action) => {
      state.isRedirected = action.payload
      state.error = { state: true, message: "Log in before" }
    },
    clearUserData: (state, action) => {
      console.log(action)
      state.username = null
      state.userToken = null
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.setItem("theme", "light")
    },
    logOut: (state, action) => {
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthRequest.fulfilled, (state, action) => {
        const status = action.payload.status
        const username = action.meta.arg.username
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
      })
      .addCase(fetchGetUserDarkMode.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchGetUserDarkMode.fulfilled, (state, action) => {
        state.darkmode = action.payload.darkmode
        state.loading = false
      })
      .addCase(fetchUpdateUserDarkMode.fulfilled, (state, action) => {
        state.darkmode = action.meta.arg
      })
  },
})

export const { setRedirected, clearUserData, logOut, userLogged } =
  userSlice.actions
export default userSlice.reducer
