import axios from 'axios';
import { store } from '@/app/redux/store';
import { fetchActivitiesProviderData } from '@/app/redux/features/activitiesProviderSlice';

describe("provider's activities state tests", () => {
    it("Should be able to fetch the provider's activities", async () => {
        const response = await axios.post(
            'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1/load',
            {
                query: {
                    order: {
                        'datamart_daily_user_activities.activities': 'desc',
                    },
                    measures: ['datamart_daily_user_activities.activities'],
                    timeDimensions: [
                        {
                            dimension: 'datamart_daily_user_activities.date',
                        },
                    ],
                    dimensions: ['datamart_daily_user_activities.provider'],
                },
            },
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM`,
                },
            }
        );

        const providerActivities = response.data.data;

        const result = await store.dispatch(fetchActivitiesProviderData());

        expect(result.type).toBe('cube/fetchActivitiesProviderData/fulfilled');
        expect(result.payload).toEqual(providerActivities);

        const state = store.getState().activitiesProvider.data;
        expect(state).toEqual(providerActivities);
    });
});
