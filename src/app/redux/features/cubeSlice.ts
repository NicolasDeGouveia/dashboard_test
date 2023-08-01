
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cube credentials
const cubeApiUrl = 'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1';
const cubeApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM';

// Query provider data
const cubeProviderQuery = {
    "query": {
        "dimensions": ['datamart_daily_user_activities.provider'],
        "order": {
            'datamart_daily_user_activities.activities': 'desc'
        }
    }
};

// Query activities per provider data
const cubeActivitiesProviderQuery = {
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

// Fetch provider data function
export const fetchProviderData = createAsyncThunk('cube/fetchData', async () => {
  const response = await axios.post(`${cubeApiUrl}/load`, cubeProviderQuery, {
    headers: { Authorization: `Bearer ${cubeApiToken}` },
  });
  return response.data.data;
});

// Fetch provider data function
export const fetchActivitiesProviderData = createAsyncThunk('cube/fetchActivitiesProviderMonthData', async () => {
  const response = await axios.post(`${cubeApiUrl}/load`, cubeActivitiesProviderQuery, {
    headers: { Authorization: `Bearer ${cubeApiToken}` },
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
    // PROVIDER SECTION DATA
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
     // ACTIVITIES SECTION DATA
    builder
      .addCase(fetchActivitiesProviderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesProviderData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
      .addCase(fetchActivitiesProviderData.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
  },
});

export default cubeSlice.reducer;