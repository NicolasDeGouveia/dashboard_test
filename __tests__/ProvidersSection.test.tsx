import axios from 'axios';
import { store } from '@/app/redux/store';
import { fetchProviderData } from '@/app/redux/features/providerSlice';

describe('providers state tests', () => {
    it('Should be able to fetch the providers', async () => {
        const response = await axios.post(
            'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1/load',
            {
                query: {
                    dimensions: ['datamart_daily_user_activities.provider'],
                    order: {
                        'datamart_daily_user_activities.activities': 'desc',
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM`,
                },
            }
        );

        const providers = response.data.data;

        const result = await store.dispatch(fetchProviderData());

        expect(result.type).toBe('cube/fetchData/fulfilled');
        expect(result.payload).toEqual(providers);

        const state = store.getState().provider.data;
        expect(state).toEqual(providers);
    });
});
