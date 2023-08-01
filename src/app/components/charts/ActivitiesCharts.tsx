import React from 'react';
import LineChart from './LineChart';
import BarCharts from './BarCharts';
import Card from './Card';

function ActivitiesCharts() {
    return (
        <section className="w-full">
            <div className="flex flex-col items-center justify-center w-full h-full my-8 lg:flex-row">
                <LineChart />
                <BarCharts />
            </div>

            <Card />
        </section>
    );
}

export default ActivitiesCharts;
