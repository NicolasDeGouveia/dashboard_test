import {PreloadedState, combineReducers, configureStore} from "@reduxjs/toolkit"
import navReducer from "./features/navSlice"
import providerReducer from './features/providerSlice'
import activitiesMonthReducer from "./features/activitiesMonthSlice"
import activitiesProviderReducer from "./features/activitiesProviderSlice"
import userReducer from "./features/userSlice"

const rootReducer = combineReducers({
navigation: navReducer,
provider: providerReducer,
activitiesMonth: activitiesMonthReducer,
activitiesProvider: activitiesProviderReducer,
user: userReducer
},)

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
reducer: rootReducer,
preloadedState
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']