import { RootState } from '@/app/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

type Props = {
    number: number[];
    loading: boolean;
};

function Card({ number, loading }: Props) {
    let sum = 0;
    number.forEach((num) => (sum += num));

    return (
        <div className=" m-auto p-4 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-gradient-to-bl from-[#000] via-[#000] to-orange-200 max-w-xs h-40">
            <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-white uppercase">Total Activities</h3>
                {loading || number.length === 0 ? (
                    <div className="mt-2">
                        <Loader />
                    </div>
                ) : (
                    <div className="text-4xl font-bold text-white">{sum}</div>
                )}
            </div>
        </div>
    );
}

export default Card;
