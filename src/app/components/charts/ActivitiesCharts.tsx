import React from 'react';
import LineChart from './LineChart';
import BarCharts from './BarCharts';
import Card from './Card';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

function ActivitiesCharts() {
    const { data, loading } = useSelector((state: RootState) => state.activitiesProvider);
    const activities = data?.map((item) =>
        parseInt(item['datamart_daily_user_activities.activities'])
    );
    return (
        <section className="w-full">
            <div className="flex flex-col items-center justify-center w-full h-full my-8 lg:flex-row">
                <LineChart />
                <BarCharts />
            </div>

            <Card
                number={activities}
                loading={loading}
            />
        </section>
    );
}

export default ActivitiesCharts;
