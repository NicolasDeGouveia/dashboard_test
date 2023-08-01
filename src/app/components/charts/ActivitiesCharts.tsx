import { fetchActivitiesProviderData } from '@/app/redux/features/cubeSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ActivitiesCharts() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.cube);
    console.log(data);

    useEffect(() => {
        dispatch(fetchActivitiesProviderData());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error !== null) {
        return <div>Error: {error}</div>;
    }

    return <div>ActivitiesCharts</div>;
}

export default ActivitiesCharts;
