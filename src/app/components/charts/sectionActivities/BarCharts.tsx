import { fetchActivitiesProviderData } from '@/app/redux/features/activitiesProviderSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactECharts, ReactEChartsProps } from '../Generic/ReactECharts';
import Loader from '../../Loader';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({ weight: '700', subsets: ['latin'] });

const BarCharts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.activitiesProvider);

    const provider = data?.map((item) => item['datamart_daily_user_activities.provider']);
    const activities = data?.map((item) =>
        parseInt(item['datamart_daily_user_activities.activities'])
    );
    // Create an empty Array to push each provider with
    // his activities and put them in the source option
    const sourceData = [];
    sourceData.push(['product', 'Activities']);
    for (let i = 0; i < data?.length; i++) {
        sourceData.push([provider[i], activities[i]]);
    }

    useEffect(() => {
        dispatch(fetchActivitiesProviderData());
    }, [dispatch]);

    const option: ReactEChartsProps['option'] = {
        legend: {},
        tooltip: {},
        dataset: {
            source: sourceData,
        },
        xAxis: [{ type: 'category', gridIndex: 0 }],
        yAxis: [{ gridIndex: 0 }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
            // These series are in the first grid.
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' },
        ],
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="text-white">An error occured. Please retry later.</div>;
    }

    return (
        <div className="w-full md:col-span-2 relative h-[25vh] m-auto lg:p-4 border rounded-lg bg-[#3a3838]">
            <h2 className={`${ubuntu.className} px-4 font-semibold text-white uppercase`}>
                Activities per provider
            </h2>
            <ReactECharts
                option={option}
                style={{ height: '350px', marginLeft: '1rem', color: 'white' }}
            />
        </div>
    );
};

export default BarCharts;
