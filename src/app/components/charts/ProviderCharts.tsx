import { fetchCubeData } from '@/app/redux/features/cubeSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProviderCharts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.cube);

    useEffect(() => {
        dispatch(fetchCubeData());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error !== null) {
        return <div>Error: {error}</div>;
    }

    return (
        <section>
            <h2>Provider List</h2>
            <ul>
                {data?.map((item, index) => (
                    <li key={index}>{item['datamart_daily_user_activities.provider']}</li>
                ))}
            </ul>
        </section>
    );
};

export default ProviderCharts;
