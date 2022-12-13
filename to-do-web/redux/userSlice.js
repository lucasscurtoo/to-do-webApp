import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersGetUserDarkMode, usersUpdateUserDarkMode } from "../api/users";

export const fetchGetUserDarkMode = createAsyncThunk('users/getUserDarkMode', async() => {
    const response = await usersGetUserDarkMode()
    return response.data
})

export const fetchUpdateUserDarkMode = createAsyncThunk('users/updateUserDarkMode', async(darkmodeState) => {
    const response = await usersUpdateUserDarkMode(darkmodeState)
    return response
})

const userSlice = createSlice({
    name:"user",
    initialState:{
        isRedirected: false,
        username: null,
        //cambiar esto por un is logged y un verificar si esta logeado lo dejamos, sino no lo dejamos pasar nashee
        darkmode: false
    },
    reducers: {
        setRedirectState: (state, action) => {
            state.isRedirected = action.payload
          },
        setUsername: (state, action) => {
            state.username = action.payload
        }
    },
    extraReducers: builder => {
       builder
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
    }
})


export const {setRedirectState, changeDarkmodeState, setUsername} = userSlice.actions;
export default userSlice.reducer
