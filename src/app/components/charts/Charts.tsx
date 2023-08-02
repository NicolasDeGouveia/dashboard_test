'use client';
import { RootState } from '@/app/redux/store';
import React from 'react';

import { useSelector } from 'react-redux';
import ProviderCharts from './sectionProvider/ProviderCharts';
import ActivitiesCharts from './sectionActivities/ActivitiesCharts';
import HomePage from '../HomePage';

const Charts = () => {
    const count = useSelector((state: RootState) => state.navigation.value);
    return (
        <section className="w-full h-auto pt-12 lg:pl-12 lg:pr-8 ">
            {count === 0 && <HomePage />}
            {count === 1 && <ProviderCharts />}
            {count === 2 && <ActivitiesCharts />}
        </section>
    );
};

export default Charts;
