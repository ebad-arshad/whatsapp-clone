import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChatBox from '../../components/ChatBox/ChatBox';
import SideBar from '../../components/SideBar/SideBar';
import SideBarAddFriend from '../../components/SideBarAddFriend/SideBarAddFriend';
import WhatsAppScreen from '../../components/WhatsAppScreen/WhatsAppScreen';
import './Main.css';

const Main = () => {

    const conditionStore = useSelector((state) => state.conditionStore.isAddFriendTab);

    return (
        <div className='main'>
            
            {conditionStore ? <SideBarAddFriend /> : <SideBar />}
            {/* <ChatBox /> */}
            <WhatsAppScreen />
        </div>
    )
}

export default Main