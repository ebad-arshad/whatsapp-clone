import React from 'react'
import './UserSearched.css'
import { BsCheck2 } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'

const UserSearched = ({ friendSearched, data }) => {

    const friendAdded = () => {
        friendSearched(false, 'added')
    }

    const friendDeclined = () => {
        friendSearched(false, 'declined')
    }

    return (
        <div className='userSearched'>
            <div className="userPic">
                {data.profile ? <img src={data.profile} alt="userPic" /> : <FaUserCircle />}
            </div>
            <div className="userName">Name: <span>{data.name}</span></div>
            <div className="userNumber">Number: <span>{data.phoneNumber}</span></div>
            <div className="btns"><BsCheck2 onClick={friendAdded} /><RxCross1 onClick={friendDeclined} /></div>
        </div>
    )
}

export default UserSearched