
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cube credentials
const cubeApiUrl = 'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1';
const cubeApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM';


// Query activities per provider per month data
const cubeActivitiesProviderMonthQuery = {
    "query": {
        "order": {
            "datamart_daily_user_activities.date": "asc"
        },
        "measures": [
            "datamart_daily_user_activities.activities"
        ],
        "timeDimensions": [
            {
                "dimension": "datamart_daily_user_activities.date",
                "granularity": "month"
            }
        ]
    }
};



// Fetch provider data per month function
export const fetchActivitiesProviderMonthData = createAsyncThunk('cube/fetchActivitiesProviderMonthData', async () => {
  const response = await axios.post(`${cubeApiUrl}/load`, cubeActivitiesProviderMonthQuery, {
    headers: { Authorization: `Bearer ${cubeApiToken}` },
  });
  return response.data.data;
});


// Create a Redux slice to manage the state
const cubeSlice = createSlice({
  name: 'activitiespermonth',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivitiesProviderMonthData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesProviderMonthData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
      .addCase(fetchActivitiesProviderMonthData.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });

    
  },
});

export default cubeSlice.reducer;