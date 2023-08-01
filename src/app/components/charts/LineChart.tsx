'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { ReactECharts, ReactEChartsProps } from './ReactECharts';
import { fetchActivitiesProviderMonthData } from '@/app/redux/features/activitiesMonthSlice';
import Loader from '../Loader';

const LineChart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.activitiesMonth);

    // Map to retrieves both dates & activities to store in chart option
    const dates = data?.map((item) => item['datamart_daily_user_activities.date.month']);

    const activities = data?.map((item) =>
        parseInt(item['datamart_daily_user_activities.activities'])
    );

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
        dispatch(fetchActivitiesProviderMonthData());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error !== null) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full lg:max-w-[40rem] h-auto m-auto bg-black rounded-lg mb-4 lg:mb-0">
            <span className="px-4 font-semibold text-white uppercase">Activities per month </span>

            <ReactECharts
                option={option}
                style={{ height: '250px', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
            />
        </div>
    );
};

export default LineChart;
