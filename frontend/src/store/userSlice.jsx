// https://react-redux.js.org/tutorials/quick-start

import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user : null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetalles : (state,action)=>{
        state.user = action.payload
        console.log("DATA USUARIOS :", action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetalles } = userSlice.actions

export default userSlice.reducer