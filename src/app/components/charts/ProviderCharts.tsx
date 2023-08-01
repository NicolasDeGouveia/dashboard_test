import { fetchProviderData } from '@/app/redux/features/providerSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import getIcon from '@/utils/function/getIcon';

const ProviderCharts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.provider);

    useEffect(() => {
        dispatch(fetchProviderData());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error !== null) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="flex items-center justify-center h-full">
            <ul className="grid grid-cols-3 gap-8 ">
                {data?.map((item, index) => (
                    <li
                        key={index}
                        className="p-4 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] uppercase text-center flex items-center transform transition duration-500 hover:scale-105 "
                    >
                        <span className="pr-4">
                            {getIcon(item['datamart_daily_user_activities.provider'])}
                        </span>
                        {item['datamart_daily_user_activities.provider']}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProviderCharts;
