import React from 'react';
import LineChart from './LineChart';
import BarCharts from './BarCharts';
import Card from './Card';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { PT_Serif } from 'next/font/google';

const ptserif = PT_Serif({ weight: '700', subsets: ['latin'] });

function ActivitiesCharts() {
    const { data, loading } = useSelector((state: RootState) => state.activitiesProvider);
    const activities = data?.map((item) =>
        parseInt(item['datamart_daily_user_activities.activities'])
    );
    return (
        <>
            <h2 className={`${ptserif.className} text-2xl font-bold `}>Activities</h2>
            <div className="flex flex-col items-center justify-center my-8 lg:flex-row">
                <LineChart />
                <BarCharts />
            </div>

            <Card
                number={activities}
                loading={loading}
            />
        </>
    );
}

export default ActivitiesCharts;
