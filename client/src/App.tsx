import './App.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ChatItem from './components/chat-item';

import Chat from './components/chat'

import { io } from 'socket.io-client'


const socket = io('http://localhost:3001')
// socket.on('connect', () => {
//   console.log(`you connected with ID ${socket.id}`)
// })

function App() {

  return (
      <div className='app'>
            <div className='app-body'>

                <div className='sidebar'>
                  <div className='sidebar-header'>
                          <Avatar color='action'/>
                          <div className='sidebar-header-right'>
                          <DonutLargeIcon color='action'/>
                          <ChatIcon color='action'/>
                          <MoreVertIcon color='action'/>
                          </div>
                  </div>
                  <div className='sidebar-search'>
                      <div className="search-container">
                          <SearchIcon color='action'/>
                          <input placeholder='Search or start a new chat'/>
                      </div>
                  </div>
                  <div className='sidebar-list'>
                      <ChatItem/>
                      <ChatItem/>
                      <ChatItem/>
                      <ChatItem/>
                      <ChatItem/>
                  </div>
                  
                </div>

                <div className='chat'>
                  <Chat></Chat>
                </div>
            
            </div>
        </div> 
  )
}

export default App
