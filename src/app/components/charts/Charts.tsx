'use client';
import { RootState } from '@/app/redux/store';
import React from 'react';

import { useSelector } from 'react-redux';
import ProviderCharts from './ProviderCharts';
import ActivitiesCharts from './ActivitiesCharts';

const Charts = () => {
    const count = useSelector((state: RootState) => state.navigation.value);
    return (
        <div className="flex justify-start px-4 pt-12">
            {count === 1 && <ProviderCharts />}
            {count === 2 && <ActivitiesCharts />}
        </div>
    );
};

export default Charts;
