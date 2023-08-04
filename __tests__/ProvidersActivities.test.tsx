import axios from 'axios';
import { setupStore } from '@/app/redux/store';
import { fetchActivitiesProviderData } from '@/app/redux/features/activitiesProviderSlice';

describe("provider's activities state tests", () => {
    it("Should be able to fetch the provider's activities", async () => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`,
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
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CUBE_API_KEY}`,
                },
            }
        );

        const providerActivities = response.data.data;
        const store = setupStore();

        const result = await store.dispatch(fetchActivitiesProviderData());

        expect(result.type).toBe('cube/fetchActivitiesProviderData/fulfilled');
        expect(result.payload).toEqual(providerActivities);

        const state = store.getState().activitiesProvider.data;
        expect(state).toEqual(providerActivities);
    });
});
