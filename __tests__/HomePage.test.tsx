import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../src/utils/function/test-utils';
import HomePage from '@/app/components/HomePage';
export const handlers = [
    rest.post(`${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`, (req, res, ctx) => {
        return res(
            ctx.json({
                data: [{ 'datamart_daily_user_activities.count': 198 }],
            })
        );
    }),
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
