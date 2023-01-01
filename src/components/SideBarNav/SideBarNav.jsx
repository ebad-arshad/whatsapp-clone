import React from 'react'
import './SideBarNav.css'
import image from '../../assets/images/passportSizePhoto.jpeg'
import { FaUsers } from 'react-icons/fa'
import { MdMarkEmailUnread } from 'react-icons/md'
import { SiGooglemessages } from 'react-icons/si'
import { SlOptionsVertical } from 'react-icons/sl'

const SideBarNav = () => {
    return (
        <div className='sideBarNav'>
            <div className="imageCover">
                <img src={image} alt="coverImage" />
            </div>
            <div className="sideBarNavOptions">
                <div className="usersIcon"><FaUsers /></div>
                <div className="statusIcon"><MdMarkEmailUnread /></div>
                <div className="messageIcon"><SiGooglemessages /></div>
                <div className="optionIcon"><SlOptionsVertical /></div>
            </div>
        </div>
    )
}

export default SideBarNav