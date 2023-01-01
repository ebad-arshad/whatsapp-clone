import React from 'react';
import SideBarNav from '../SideBarNav/SideBarNav';
import SideBarSearch from '../SideBarSearch/SideBarSearch';
import SideBarList from '../SideBarList/SideBarList';
import './SideBar.css';

const SideBar = () => {
    return (
        <div className='sideBar'>
            <SideBarNav />
            <SideBarSearch />
            <SideBarList />
        </div>
    )
}

export default SideBar