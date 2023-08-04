import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Query activities per provider per month data
const cubeUserQuery = {
    "query": {
        "measures":["datamart_daily_user_activities.count"]
    }
};



// Fetch provider data per month function
export const fetchUserData = createAsyncThunk('cube/fetchUserData', async () => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`, cubeUserQuery, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CUBE_API_KEY}` },
  });
  return response.data.data;
});


// Create a Redux slice to manage the state
const cubeSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });

    
  },
});

export default cubeSlice.reducer;