import React from 'react'
import './ChatBox.css'
import ChatBoxNav from '../ChatBoxNav/ChatBoxNav'
import ChatBoxInputField from '../ChatBoxInputField/ChatBoxInputField'
import Chat from '../Chat/Chat'

const ChatBox = () => {
  return (
    <div className='chatBox'>
      <div className="chatBackground"></div>
      <ChatBoxNav />
      <Chat />
      <ChatBoxInputField />
    </div>
  )
}

export default ChatBox