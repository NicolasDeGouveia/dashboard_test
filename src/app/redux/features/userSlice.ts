import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Query activities per provider per month data
const cubeUserQuery = {
    "query": {
        "measures":["datamart_daily_user_activities.count"]
    }
};



// Fetch provider data per month function
export const fetchUserData = createAsyncThunk('cube/fetchUserData', async() => {
      const maxTries = 15;
  const delayBetweenRetries = 1000; // Adjust this value to set the delay in milliseconds
  let response = null;

    // Loop until API is ready or maxTries is reached (Prevent {"error":"Continue wait"} to lock the app init)
    // Dev only purpose - API should not respond with {"error":"Continue wait"} in production
  for (let tryCount = 1; tryCount <= maxTries; tryCount++) {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`,
      cubeUserQuery,
      {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CUBE_API_KEY} `},
      }
    );


    if (response.data.error === 'Continue wait') {
      await new Promise((resolve) => setTimeout(resolve, delayBetweenRetries));
    } else if (response.data.data) {
      return response.data.data;
    } else {
      return null;
    }
  }

  return null;

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