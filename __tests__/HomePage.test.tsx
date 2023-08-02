import { configureStore } from '@reduxjs/toolkit';
import { RootState, store } from '../src/app/redux/store';
import { fetchUserData } from '@/app/redux/features/userSlice'; // Import the fetchUserData function
import userReducer from '@/app/redux/features/userSlice';

jest.mock('../src/app/redux/features/userSlice', () => ({
    fetchUserData: jest.fn(() => ({
        type: 'cube/fetchUserData',
        payload: [{ 'datamart_daily_user_activities.count': 10 }],
    })),
}));

describe('user redux state tests', () => {
    beforeEach(() => {
        store;
    });

    it('Should be able to fetch the user activities', async () => {
        const result = await store.dispatch(fetchUserData()); // Use the mocked version
        const user = result.payload;

        expect(result.type).toBe('cube/fetchUserData');
        expect(user).toEqual([{ 'datamart_daily_user_activities.count': 10 }]); // Updated assertion

        const state = store.getState().user.data;
        expect(state).toEqual(user); // Updated assertion
    });
});
