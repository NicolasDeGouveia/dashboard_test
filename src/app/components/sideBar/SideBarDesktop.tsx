'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Packages
import { AiOutlineChrome } from 'react-icons/ai';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setCurrentComponent } from '@/app/redux/features/navSlice';
import { FaHome, FaHubspot } from 'react-icons/fa';
import { RiNumbersFill } from 'react-icons/ri';

const SideBarDesktop = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <aside className="hidden fixed h-full p-4 bg-[#3a3838] border-r-[1px] lg:flex flex-col justify-between">
            <div className="flex flex-col items-center h-full">
                <div
                    className="inline-block p-3 text-xl text-white bg-orange-200 rounded-lg"
                    onClick={() => dispatch(setCurrentComponent({ componentType: 0 }))}
                >
                    <AiOutlineChrome />
                </div>
                <span className="border-b-[1px] border-gray-200 w-full p-2 mb-4" />
                <div className="flex flex-col items-center justify-center h-full">
                    <div
                        className={style.link}
                        onClick={() => dispatch(setCurrentComponent({ componentType: 0 }))}
                    >
                        <span className="pr-4 text-2xl">
                            <FaHome />
                        </span>
                        Home
                    </div>
                    <div
                        className={style.link}
                        onClick={() => dispatch(setCurrentComponent({ componentType: 1 }))}
                    >
                        <span className="pr-4 text-2xl">
                            <FaHubspot />
                        </span>
                        Provider
                    </div>
                    <div
                        className={style.link}
                        onClick={() => dispatch(setCurrentComponent({ componentType: 2 }))}
                    >
                        <span className="pr-4 text-2xl">
                            <RiNumbersFill />
                        </span>
                        Activities
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBarDesktop;

const style = {
    link: 'w-full text-xl font-bold text-white uppercase hover:text-orange-200 link link-underline link-underline-black my-4 cursor-pointer justify-start flex items-center',
};
