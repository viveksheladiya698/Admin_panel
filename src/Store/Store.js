import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './CounterSlice/CounterReducer'

export const store = configureStore({
    reducer: {
        counter : counterSlice
    },
})