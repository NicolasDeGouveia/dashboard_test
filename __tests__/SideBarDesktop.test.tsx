import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState, store } from '@/app/redux/store'; // Import your real Redux store
import SideBarDesktop from '../src/app/components/sideBar/SideBarDesktop';
import { setCurrentComponent } from '@/app/redux/features/navSlice';

describe('SideBarDesktop component', () => {
    it('should change the state to 1 when clicking on "Provider" and 2 when clicking on "Activities"', () => {
        // Reset the store to the initial state before each test
        store.dispatch(setCurrentComponent({ componentType: 0 }));

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
