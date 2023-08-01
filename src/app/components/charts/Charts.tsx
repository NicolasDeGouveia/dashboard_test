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
        <section className="h-auto pt-12 lg:pl-12 lg:h-screen ">
            {count === 0 && <HomePage />}
            {count === 1 && <ProviderCharts />}
            {count === 2 && <ActivitiesCharts />}
        </section>
    );
};

export default Charts;
