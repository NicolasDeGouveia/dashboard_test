// import axios from 'axios'; // Import axios
// import { fetchUserData } from '../src/app/redux/features/userSlice'; // Make sure to import the cubeSlice correctly
// import { store } from '@/app/redux/store';

// describe('user activities state tests', () => {
//     it('Should be able to fetch the user activities', async () => {
//         const response = await axios.post(
//             'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1/load',
//             {
//                 query: {
//                     measures: ['datamart_daily_user_activities.count'],
//                 },
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA3OTMwNDN9.by1HD6M6l-g0pTEWRaXvYwsSWFdSI9VejrTdOGOodPM`,
//                 },
//             }
//         );

//         const user = response.data.data;

//         const result = await store.dispatch(fetchUserData());

//         expect(result.type).toBe('cube/fetchUserData/fulfilled');
//         expect(result.payload).toEqual(user);

//         const state = store.getState().user.data;
//         expect(state).toEqual(user);
//     });
// });

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../src/utils/function/test-utils';
import HomePage from '@/app/components/HomePage';

export const handlers = [
    rest.post(
        'https://silver-quelea.gcp-europe-west3-a.cubecloudapp.dev/cubejs-api/v1/load',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [{ 'datamart_daily_user_activities.count': 198 }],
                })
            );
        }
    ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches & receives the user's activities number", async () => {
    renderWithProviders(<HomePage />);

    // after some time, the activities number should be received
    expect(await screen.findByText(/198/i)).toBeInTheDocument();
});
