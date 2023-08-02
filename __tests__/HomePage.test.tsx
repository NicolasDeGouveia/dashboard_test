import axios from 'axios'; // Import axios
import cubeSlice, { fetchUserData } from '../src/app/redux/features/userSlice'; // Make sure to import the cubeSlice correctly
import { store } from '@/app/redux/store';

describe('user redux state tests', () => {
    it('Should be able to fetch the user activities', async () => {
        const response = await axios.post(
            'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1/load',
            {
                query: {
                    measures: ['datamart_daily_user_activities.count'],
                },
            },
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM`,
                },
            }
        );

        const user = response.data.data;

        // Dispatch the action with the real data
        const result = await store.dispatch(fetchUserData());

        expect(result.type).toBe('cube/fetchUserData/fulfilled');
        expect(result.payload).toEqual(user); // Updated assertion

        const state = store.getState().user.data;
        expect(state).toEqual(user); // Updated assertion
    });
});
