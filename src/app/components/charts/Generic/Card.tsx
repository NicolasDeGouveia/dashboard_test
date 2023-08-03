import React from 'react';
import Loader from '../../Loader';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({ weight: '700', subsets: ['latin'] });

type Props = {
    number: number[];
    loading: boolean;
};

function Card({ number, loading }: Props) {
    let sum = 0;
    number?.forEach((num) => (sum += num));

    return (
        <div className=" m-auto p-4 rounded-2xl shadow-[0px_1px_3px_0px_rgb(254_215_170)] bg-[#3a3838] max-w-xs h-40">
            <div className="flex flex-col items-center justify-center h-full">
                <h3 className={`${ubuntu.className} text-white uppercase text-xl`}>
                    Total Activities
                </h3>
                {loading || number?.length === 0 ? (
                    <div className="mt-2">
                        <Loader />
                    </div>
                ) : (
                    <div className="text-4xl font-bold text-orange-200">{sum}</div>
                )}
            </div>
        </div>
    );
}

export default Card;
