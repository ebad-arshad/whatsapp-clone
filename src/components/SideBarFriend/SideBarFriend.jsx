import React from 'react'
import './SideBarFriend.css'
import image from '../../assets/images/passportSizePhoto.jpeg'

const SideBarFriend = () => {
    return (
        <div className='sideBarFriend'>

            <div className="friendPic"><img src={image} alt="friendPic" /></div>
            <div className="friendName"><p>lallu gang</p><p>Rafi: hn</p></div>
            <div className="friendTime">3:02 pm</div>

        </div>
    )
}

export default SideBarFriend