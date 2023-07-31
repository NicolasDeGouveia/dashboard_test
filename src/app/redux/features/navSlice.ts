import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavState {
  value: number;
}

const initialState: NavState = {
  value: 0,
}

// Define a specific interface for the payload
interface ComponentTypePayload {
  componentType: number;
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setCurrentComponent: (state, action: PayloadAction<ComponentTypePayload>) => {
      // Now the action payload is expected to be an object with a "componentType" property
      state.value = action.payload.componentType;
    },
  },
})

// Action creator will now expect the payload to be of type ComponentTypePayload
export const { setCurrentComponent } = navSlice.actions;

export default navSlice.reducer;