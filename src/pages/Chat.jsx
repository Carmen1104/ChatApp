import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatScreen from '../components/ChatScreen'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="container">
        <Sidebar/>
        <ChatScreen />
      </div>       
    </div>
  )
}

export default Chat