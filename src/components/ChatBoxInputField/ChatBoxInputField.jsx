import React from 'react'
import './ChatBoxInputField.css'
import { IoMdMic } from 'react-icons/io'
import { CgSmileMouthOpen } from 'react-icons/cg'
import { AiOutlinePaperClip } from 'react-icons/ai'

const ChatBoxInputField = () => {
    return (
        <div className='chatBoxInputField'>
            <div className="icons"><CgSmileMouthOpen /><AiOutlinePaperClip /></div>
            <div className="chatBoxInputSearch"><input autoComplete='off' spellCheck='false' type="text" placeholder='Type a message' /></div>
            <div className="recordIcon"><IoMdMic /></div>
        </div>
    )
}

export default ChatBoxInputField