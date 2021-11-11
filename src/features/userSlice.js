import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload)
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        register: (state, action) => {
            // state.user = action.payload
            console.log(action.payload)
        }
    }
})

export const {login, logout, register} = userSlice.actions;

export default userSlice.reducer;
