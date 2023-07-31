'use client';
import React from 'react';
// Components
import SideBarDesktop from './SideBarDesktop';
import SideBarMobile from './SideBarMobile';

const SideBar = () => {
    return (
        <>
            <SideBarDesktop />
            <SideBarMobile />
        </>
    );
};

export default SideBar;
