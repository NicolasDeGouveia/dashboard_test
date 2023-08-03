import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore, RootState } from '@/app/redux/store';
import SideBarDesktop from '../src/app/components/sideBar/SideBarDesktop';

describe('SideBarDesktop component', () => {
    it('should change the state to 1 when clicking on "Provider" and 2 when clicking on "Activities"', () => {
        const store = setupStore();

        // Render the component with Redux Provider and your real store
        const { getByText } = render(
            <Provider store={store}>
                <SideBarDesktop />
            </Provider>
        );

        // Click on "Provider" element and check if the state changes to 1
        const providerLink = getByText('Provider');
        fireEvent.click(providerLink);
        expect((store.getState() as RootState).navigation.value).toEqual(1);

        // Click on "Activities" element and check if the state changes to 2
        const activitiesLink = getByText('Activities');
        fireEvent.click(activitiesLink);
        expect((store.getState() as RootState).navigation.value).toEqual(2);
    });
});
