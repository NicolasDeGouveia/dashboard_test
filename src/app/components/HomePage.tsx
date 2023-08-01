import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUserData } from '../redux/features/userSlice';
import Card from './charts/Card';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.user);

    const activities = data?.map((item) => parseInt(item['datamart_daily_user_activities.count']));
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <div>
            <Card
                number={activities}
                loading={loading}
            />
        </div>
    );
};

export default HomePage;
