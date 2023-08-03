'use client';

import { setupStore } from './store';
import { Provider } from 'react-redux';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    const store = setupStore();
    return <Provider store={store}>{children}</Provider>;
}
