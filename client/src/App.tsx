import './App.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatItem from './components/chat-item';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';

import io from 'socket.io-client'
import { useEffect } from 'react';

const uri = 'http://localhost:3000'
const socket = io(uri)
const myphoneNumber = prompt('your number?','')

// socket.on('connect', () => {
//   console.log(`you connected with ID ${socket.id}`)
// })

function App() {

  const updateUser = async (socketId : any) => {
    let res = await fetch(uri + '/user', {
      method : 'PUT',
      body : JSON.stringify({phoneNumber : myphoneNumber, socketId : socketId}),
      headers : {'content-type' : 'application/json'}
    })

    let data = await res.json()
    console.log(data)

  }

  const getUser = async () => {
    let number = prompt('type phone number','')
    let res = await fetch(uri + '/user/' + number, {
      method : 'GET',
      headers : {'content-type' : 'application/json'}
    })

    let data = await res.json()
    console.log(data.socketId)

  }


  useEffect(()=> {
    socket.on('connect',()=>{
      console.log(socket.connected)
      console.log(socket.id)
      console.log('connected')
      updateUser(socket.id)
    })

    return () => {
      socket.off('connect')
    }
  },[])

  return (
      <div className='app'>
            <div className='app-body'>

                <div className='sidebar'>
                  <div className='sidebar-header'>
                          <Avatar color='action' src='myAvatar.jpg'/>
                          <div className='sidebar-header-right'>
                          <DonutLargeIcon color='action'/>
                            <span onClick={getUser}>
                              <ChatIcon color='action'/>
                            </span>
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
                  <div className="chat-body">

                  </div>
                  <div className="chat-footer">
                    <div className="chat-footer-actions">
                        <InsertEmoticonIcon color='action'/>
                        <AttachFileIcon color='action'/>
                    </div>
                    <div className="chat-footer-input">
                      <input placeholder='Type a message'/>
                    </div>
                    
                    <div className="chat-footer-mic">
                      <MicIcon/>
                    </div>
                  </div>


                  {/* <Chat></Chat> */}
                </div>
            
            </div>
        </div> 
  )
}

export default App
