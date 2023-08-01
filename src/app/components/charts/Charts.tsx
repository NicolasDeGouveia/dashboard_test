'use client';
import { RootState } from '@/app/redux/store';
import React from 'react';

import { useSelector } from 'react-redux';
import ProviderCharts from './ProviderCharts';
import ActivitiesCharts from './ActivitiesCharts';
import HomePage from '../HomePage';

const Charts = () => {
    const count = useSelector((state: RootState) => state.navigation.value);
    return (
        <div className="h-full px-4 pt-12 ">
            {count === 0 && <HomePage />}
            {count === 1 && <ProviderCharts />}
            {count === 2 && <ActivitiesCharts />}
        </div>
    );
};

export default Charts;
