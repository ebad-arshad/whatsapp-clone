import React from 'react'
import './SideBarNav.css'
import image from '../../assets/images/passportSizePhoto.jpeg'
import { FaUsers } from 'react-icons/fa'
import { MdMarkEmailUnread } from 'react-icons/md'
import { SiGooglemessages } from 'react-icons/si'
import { SlOptionsVertical } from 'react-icons/sl'
import { TbLogout } from 'react-icons/tb'
import { signOut, auth } from '../../Firebase/Firebase'
import { useDispatch } from 'react-redux'

const SideBarNav = () => {

    const dispatch = useDispatch();

    const logOut = () => {
        signOut(auth).then(() => { })
            .catch((error) => { });
    }

    const bool = true;

    return (
        <div className='sideBarNav'>
            <div className="imageCover">
                <img src={image} alt="coverImage" />
            </div>
            <div className="sideBarNavOptions">
                <div onClick={() => dispatch({ type: 'ADDFRIENDTOGGLE', bool })} className="usersIcon"><FaUsers /></div>
                <div className="statusIcon"><MdMarkEmailUnread /></div>
                <div className="messageIcon"><SiGooglemessages /></div>
                <div className="optionIcon"><SlOptionsVertical /></div>
                <div onClick={logOut} className="logOutIcon"><TbLogout /></div>
            </div>
        </div>
    )
}

export default SideBarNav