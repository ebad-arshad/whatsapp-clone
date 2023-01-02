import React from 'react'
import SideBarFriend from '../SideBarFriend/SideBarFriend'
import './SideBarList.css'

const SideBarList = () => {
    return (
        <div className='sideBarList'>
            <SideBarFriend />
            <SideBarFriend />
            <SideBarFriend />
        </div>
    )
}

export default SideBarList