import React from 'react'
import './ChatBoxNav.css'
import image from '../../assets/images/passportSizePhoto.jpeg'
import { SlOptionsVertical } from 'react-icons/sl'
import { AiOutlineSearch } from 'react-icons/ai'

const ChatBoxNav = () => {
  return (
    <div className='chatBoxNav'>
      <div className="imageCover">
        <img src={image} alt="coverImage" />
      </div>
      <div className="friendName"><p>lallu gang</p></div>
      <div className="chatBoxIcons">
        <div className="searchIcon"><AiOutlineSearch /></div>
        <div className="optionIcon"><SlOptionsVertical /></div>
      </div>
    </div>
  )
}

export default ChatBoxNav