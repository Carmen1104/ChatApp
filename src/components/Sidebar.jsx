import React from 'react'
import Navbar from "./Navbar"
import Search from "./Search";
import ChatList from './ChatList';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <ChatList />
    </div>
  )
}

export default Sidebar