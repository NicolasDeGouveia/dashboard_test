import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavState {
  value: number;
}

const initialState: NavState = {
  value: 0,
}

interface ComponentTypePayload {
  componentType: number;
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setCurrentComponent: (state, action: PayloadAction<ComponentTypePayload>) => {
      state.value = action.payload.componentType;
    },
  },
})

export const { setCurrentComponent } = navSlice.actions;

export default navSlice.reducer;