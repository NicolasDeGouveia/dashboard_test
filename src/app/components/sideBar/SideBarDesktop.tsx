'use client';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
// Packages
import { AiOutlineChrome } from 'react-icons/ai';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setCurrentComponent } from '@/app/redux/features/navSlice';

const SideBarDesktop = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <aside className="hidden fixed h-screen p-4 bg-white border-r-[1px] lg:flex flex-col justify-between">
            <div className="flex flex-col items-center h-full">
                <Link href="">
                    <div className="inline-block p-3 text-xl text-white bg-orange-200 rounded-lg">
                        <AiOutlineChrome />
                    </div>
                </Link>
                <span className="border-b-[1px] border-gray-200 w-full p-2 mb-4" />
                <div className="flex flex-col items-center justify-center h-full">
                    <div
                        className={style.link}
                        onClick={() => dispatch(setCurrentComponent({ componentType: 1 }))}
                    >
                        Provider
                    </div>
                    <div
                        className={style.link}
                        onClick={() => dispatch(setCurrentComponent({ componentType: 2 }))}
                    >
                        Activities
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBarDesktop;

const style = {
    link: 'text-xl font-bold text-black uppercase hover:text-orange-200 link link-underline link-underline-black my-4',
};
