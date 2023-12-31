import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUserData } from '../redux/features/userSlice';
import Card from './charts/Generic/Card';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({ weight: '700', subsets: ['latin'] });

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.user.data);
    const loading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error);

    const activities = data?.map((item) => parseInt(item['datamart_daily_user_activities.count']));

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    if (error) {
        return <div className="text-white">An error occured. Please retry later.</div>;
    }

    return (
        <>
            <h2 className={`${ubuntu.className} text-3xl font-bold mb-8 ml-4 lg:ml-0 text-white`}>
                Your Activities
            </h2>
            <Card
                number={activities}
                loading={loading}
            />
        </>
    );
};

export default HomePage;
