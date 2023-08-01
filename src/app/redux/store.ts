import {configureStore} from "@reduxjs/toolkit"
import navReducer from "./features/navSlice"
import providerReducer from './features/providerSlice'
import activitiesMonthReducer from "./features/activitiesMonthSlice"
import activitiesProviderReducer from "./features/activitiesProviderSlice"

export const store = configureStore({
reducer: {
navigation: navReducer,
provider: providerReducer,
activitiesMont: activitiesMonthReducer,
activitiesProvider: activitiesProviderReducer
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;