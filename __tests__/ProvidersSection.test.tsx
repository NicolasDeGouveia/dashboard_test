import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../src/utils/function/test-utils';
import ProviderCharts from '@/app/components/charts/sectionProvider/ProviderCharts';

export const handlers = [
    rest.post(`${process.env.NEXT_PUBLIC_CUBE_API_URL}/load`, (req, res, ctx) => {
        return res(
            ctx.json({
                data: [{ 'datamart_daily_user_activities.provider': 'bigquery' }],
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
    renderWithProviders(<ProviderCharts />);

    // after some time, the activities number should be received
    expect(await screen.findByText(/bigquery/i)).toBeInTheDocument();
});
