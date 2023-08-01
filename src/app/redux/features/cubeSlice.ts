
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace this URL with your actual Cube.js API endpoint
const cubeApiUrl = 'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1';

// Replace this token with your actual Cube.js API token
const cubeApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM';

// Replace this with your Cube.js query
const cubeQuery = {
    "query": {
  "dimensions": ['datamart_daily_user_activities.provider'],
  "order": {
    'datamart_daily_user_activities.activities': 'desc'
  }
  }
};

// Create an async thunk to fetch data from Cube.js
export const fetchCubeData = createAsyncThunk('cube/fetchData', async () => {
  const response = await axios.post(`${cubeApiUrl}/load`, cubeQuery, {
    headers: { Authorization: `Bearer ${cubeApiToken}` },
  });
  return response.data.data;
});


export type CubeData = {
  [key: string]: string; 
};

// Create a Redux slice to manage the state
const cubeSlice = createSlice({
  name: 'cube',
  initialState: {
    data: [] as CubeData[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCubeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCubeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
      .addCase(fetchCubeData.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
  },
});

export default cubeSlice.reducer;