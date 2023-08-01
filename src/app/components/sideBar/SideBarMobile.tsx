'use client';
import Link from 'next/link';
import React, { useState } from 'react';
// Packages
import { AiOutlineChrome } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { setCurrentComponent } from '@/app/redux/features/navSlice';

const SideBarMobile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [toggleNavMenu, setToggleNavMenu] = useState<boolean>(false);

    const sideVariants = {
        closed: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1,
            },
        },
    };

    return (
        <>
            <div
                className={`text-xl md:text-2xl lg:hidden transition-all duration-500 absolute left-4 top-4 ${
                    toggleNavMenu ? 'rotate-90' : ''
                }`}
                onClick={() => setToggleNavMenu(!toggleNavMenu)}
            >
                <FaBars />
            </div>
            <AnimatePresence>
                {toggleNavMenu && (
                    <motion.div
                        className="fixed top-0 bottom-0 left-0 z-10 h-full lg:hidden "
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sideVariants}
                    >
                        <aside className="flex">
                            <div className="fixed h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
                                <div className="flex flex-col items-center h-full">
                                    <Link href="">
                                        <div className="inline-block p-3 text-xl text-white bg-orange-200 rounded-lg">
                                            <AiOutlineChrome />
                                        </div>
                                    </Link>
                                    <span className="border-b-[1px] border-gray-200 w-full p-2 mb-4" />
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <Link
                                            href=""
                                            className={style.link}
                                            onClick={() => {
                                                setToggleNavMenu(!toggleNavMenu),
                                                    dispatch(
                                                        setCurrentComponent({ componentType: 1 })
                                                    );
                                            }}
                                        >
                                            Provider
                                        </Link>
                                        <Link
                                            href=""
                                            className={style.link}
                                            onClick={() => {
                                                setToggleNavMenu(!toggleNavMenu),
                                                    dispatch(
                                                        setCurrentComponent({ componentType: 2 })
                                                    );
                                            }}
                                        >
                                            Activities
                                        </Link>
                                    </div>
                                    <div
                                        className="text-4xl"
                                        onClick={() => setToggleNavMenu(!toggleNavMenu)}
                                    >
                                        <BsFillArrowLeftCircleFill />
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SideBarMobile;

const style = {
    link: 'text-xl font-bold text-black uppercase hover:text-orange-200 link link-underline link-underline-black my-4',
};
