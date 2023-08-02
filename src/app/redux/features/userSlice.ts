
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cube credentials
const cubeApiUrl = 'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1';
const cubeApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM';


// Query activities per provider per month data
const cubeUserQuery = {
    "query": {
        "measures":["datamart_daily_user_activities.count"]
    }
};



// Fetch provider data per month function
export const fetchUserData = createAsyncThunk('cube/fetchUserData', async () => {
  const response = await axios.post(`${cubeApiUrl}/load`, cubeUserQuery, {
    headers: { Authorization: `Bearer ${cubeApiToken}` },
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
        console.log('Fulfilled Action:', action)
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