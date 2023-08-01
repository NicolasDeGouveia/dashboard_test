import {configureStore} from "@reduxjs/toolkit"
import navReducer from "./features/navSlice"
import cubeReducer from './features/cubeSlice'

export const store = configureStore({
reducer: {
navigation: navReducer,
cube: cubeReducer
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;