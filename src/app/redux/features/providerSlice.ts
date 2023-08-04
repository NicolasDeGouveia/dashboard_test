import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Query provider data
const cubeProviderQuery = {
    "query": {
        "dimensions": ['datamart_daily_user_activities.provider'],
        "order": {
            'datamart_daily_user_activities.activities': 'desc'
        }
    }
};

// Fetch provider data function
export const fetchProviderData = createAsyncThunk('cube/fetchData', async () => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`, cubeProviderQuery, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CUBE_API_KEY}` },
  });
  return response.data.data;
});


// Create a Redux slice to manage the state
const cubeSlice = createSlice({
  name: 'cube',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
      .addCase(fetchProviderData.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
  
  },
});

export default cubeSlice.reducer;