import { createSlice } from '@reduxjs/toolkit';

let initialState  = {
    value : false ,
}

export const counterSlice  = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        authchk:(state)=>{
            state.value = localStorage.getItem('token') !== null ? true : false
        }
    } 
})

export const { authchk } = counterSlice.actions

export default counterSlice.reducer;