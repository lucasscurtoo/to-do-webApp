import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        isRedirected: false
        //cambiar esto por un is logged y un verificar si esta logeado lo dejamos, sino no lo dejamos pasar nashee
    },
    reducers: {
        setRedirectState: (state, action) => {
            state.isRedirected = action.payload
          },
    }
})


export const { setRedirectState} = userSlice.actions;
export default userSlice.reducer
