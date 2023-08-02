import axios from 'axios';
import { store } from '@/app/redux/store';
import { fetchActivitiesProviderMonthData } from '@/app/redux/features/activitiesMonthSlice';

describe("month provider's activities state tests", () => {
    it("Should be able to fetch the provider's activities", async () => {
        const response = await axios.post(
            'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1/load',
            {
                query: {
                    order: {
                        'datamart_daily_user_activities.date': 'asc',
                    },
                    measures: ['datamart_daily_user_activities.activities'],
                    timeDimensions: [
                        {
                            dimension: 'datamart_daily_user_activities.date',
                            granularity: 'month',
                        },
                    ],
                },
            },
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM`,
                },
            }
        );

        const activitiesMonth = response.data.data;

        const result = await store.dispatch(fetchActivitiesProviderMonthData());

        expect(result.type).toBe('cube/fetchActivitiesProviderMonthData/fulfilled');
        expect(result.payload).toEqual(activitiesMonth);

        const state = store.getState().activitiesMonth.data;
        expect(state).toEqual(activitiesMonth);
    });
});
