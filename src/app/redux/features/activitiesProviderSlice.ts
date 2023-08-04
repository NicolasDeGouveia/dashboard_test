import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Query activities per provider data
const cubeActivitiesProviderQuery = {
    "query": {
      "order": {
        "datamart_daily_user_activities.activities": "desc"
      },
      "measures": [
        "datamart_daily_user_activities.activities"
      ],
      "timeDimensions": [
        {
          "dimension": "datamart_daily_user_activities.date"
        }
      ],
      "dimensions": [
        "datamart_daily_user_activities.provider"
      ]
    }
};


// Fetch provider data function
export const fetchActivitiesProviderData = createAsyncThunk('cube/fetchActivitiesProviderData', async () => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`, cubeActivitiesProviderQuery, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CUBE_API_KEY}` },
  });
  return response.data.data;
});


// Create a Redux slice to manage the state
const cubeSlice = createSlice({
  name: 'activitiesprovider',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
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