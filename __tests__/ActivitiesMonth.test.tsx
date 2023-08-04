import axios from 'axios';
import { setupStore } from '@/app/redux/store';
import { fetchActivitiesProviderMonthData } from '@/app/redux/features/activitiesMonthSlice';

describe("month provider's activities state tests", () => {
    it("Should be able to fetch the provider's activities", async () => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`,
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
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CUBE_API_KEY}`,
                },
            }
        );

        const activitiesMonth = response.data.data;
        const store = setupStore();

        const result = await store.dispatch(fetchActivitiesProviderMonthData());

        expect(result.type).toBe('cube/fetchActivitiesProviderMonthData/fulfilled');
        expect(result.payload).toEqual(activitiesMonth);

        const state = store.getState().activitiesMonth.data;
        expect(state).toEqual(activitiesMonth);
    });
});
