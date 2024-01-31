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
                          <Avatar color='action' src='myAvatar.jpg'/>
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
                      <ChatItem title='Kiro Breika' info='Hello'/>
                      <ChatItem title='Georgi' info='Hello'/>
                      <ChatItem title='Ivan' info='Hello'/>
                      <ChatItem title='Petkan' info='Hello'/>
                      <ChatItem title='Toni' info='Hello'/>
                  </div>
                  
                </div>

                <div className='chat'>
                  <div className="bg-chat"></div>
                  <div className="chat-header">
                    <Avatar id='image1' src="kiro.jpg" />
                    <div className="chat-header-info">
                        <span className='title'>Kiro Breika</span><br></br>
                        <span className='info'>last seen at 05:00</span>
                    </div>
                    <div className="chat-header-right">
                        <SearchIcon color='action'/>
                        <MoreVertIcon color='action'/>
                    </div>
                  </div>
                  <div className="chat-body"></div>
                  <div className="chat-footer"></div>


                  {/* <Chat></Chat> */}
                </div>
            
            </div>
        </div> 
  )
}

export default App
