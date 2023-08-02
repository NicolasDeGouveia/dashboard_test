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
            <h2 className={`${ptserif.className} text-2xl font-bold ml-4 lg:ml-0`}>Activities</h2>
            <div className="grid grid-cols-1 gap-4 my-8 md:grid-cols-3">
                <LineChart />
                <Card
                    number={activities}
                    loading={loading}
                />
            </div>
            <BarCharts />
        </>
    );
}

export default ActivitiesCharts;
