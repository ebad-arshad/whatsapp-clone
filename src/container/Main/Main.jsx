import React from 'react';
import ChatBox from '../../components/ChatBox/ChatBox';
import SideBar from '../../components/SideBar/SideBar';
import './Main.css';

const Main = () => {
    return (
        <div className='main'>
            <SideBar />
            <ChatBox />
        </div>
    )
}

export default Main