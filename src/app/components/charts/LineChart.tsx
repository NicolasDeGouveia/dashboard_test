'use client';
import { fetchActivitiesProviderData } from '@/app/redux/features/cubeSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactECharts, ReactEChartsProps } from './ReactECahrt';
const LineChart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.cube);

    // Map to retrieves both dates & activities to store in chart option
    const dates = data.map((item) => item['datamart_daily_user_activities.date.month']);

    const activities = data.map((item) =>
        parseInt(item['datamart_daily_user_activities.activities'])
    );
    console.log(dates);

    // Option to give to the chart component
    const option: ReactEChartsProps['option'] = {
        xAxis: {
            type: 'category',
            data: dates,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'line',
                data: activities,
                smooth: true,
            },
        ],
    };

    useEffect(() => {
        dispatch(fetchActivitiesProviderData());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error !== null) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full m-auto bg-black rounded-lg lg:w-1/2 h-1/2">
            <span className="px-4 font-semibold text-white uppercase">Activities per month </span>
            <ReactECharts
                option={option}
                style={{ height: '25rem' }}
            />
        </div>
    );
};

export default LineChart;
