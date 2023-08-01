import {configureStore} from "@reduxjs/toolkit"
import navReducer from "./features/navSlice"
import providerReducer from './features/providerSlice'
import activitiesMonthReducer from "./features/activitiesMonthSlice"
import activitiesProviderReducer from "./features/activitiesProviderSlice"
import userReducer from "./features/userSlice"

export const store = configureStore({
reducer: {
navigation: navReducer,
provider: providerReducer,
activitiesMonth: activitiesMonthReducer,
activitiesProvider: activitiesProviderReducer,
user: userReducer
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;