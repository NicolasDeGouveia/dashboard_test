import { fetchProviderData } from '@/app/redux/features/providerSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader';
import getIcon from '@/utils/function/getIcon';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({ weight: '700', subsets: ['latin'] });

const ProviderCharts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.provider);

    useEffect(() => {
        dispatch(fetchProviderData());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="text-white">An error occured. Please retry later.</div>;
    }

    return (
        <>
            <h2 className={`${ubuntu.className} text-3xl font-bold mb-8 ml-4 lg:ml-0 text-white`}>
                Providers
            </h2>
            <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-center max-w-[77.5rem] m-auto ">
                {data?.map((item, index) => (
                    <li
                        key={index}
                        className={`${ubuntu.className} p-4 rounded-2xl shadow-[0px_1px_3px_0px_rgb(254_215_170)] bg-[#3a3838] text-white uppercase text-center flex items-center transform transition duration-500 hover:scale-105 `}
                    >
                        <span className="pr-4">
                            {getIcon(item['datamart_daily_user_activities.provider'])}
                        </span>
                        {item['datamart_daily_user_activities.provider']}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProviderCharts;
