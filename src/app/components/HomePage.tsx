import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUserData } from '../redux/features/userSlice';
import Card from './charts/Card';
import { PT_Serif } from 'next/font/google';

const ptserif = PT_Serif({ weight: '700', subsets: ['latin'] });

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.user);

    const activities = data?.map((item) => parseInt(item['datamart_daily_user_activities.count']));
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <>
            <h2 className={`${ptserif.className} text-2xl font-bold `}>Your Activities</h2>
            <Card
                number={activities}
                loading={loading}
            />
        </>
    );
};

export default HomePage;
