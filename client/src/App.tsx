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
import { useEffect, useState } from 'react';


const myphoneNumber = prompt('your number?','')


const uri = 'http://localhost:3000'
const socket = io(uri ,{
  query : {
    userId: myphoneNumber
  }
})


function App() {

  const [phoneNumberChat, setPhoneNumberChat] = useState('')
  const [socketIdChat,setSocketIdChat] = useState('')
  const [message,setMessage] = useState('')
  const [mySocketId,setMysocketId] = useState<string | undefined>('')
  const [lastMessage, setLastMessage] = useState('');
  const [contactsList, setContactsList] = useState([{}])
  const [chosenContact, setChosenContact] = useState({name : '', phoneNumber : '', avatar : ''})
  const [myAvatar, setMyAvatar] = useState('');

  const updateUser = async (socketId : any) => {
    let res = await fetch(uri + '/user', {
      method : 'POST',
      body : JSON.stringify({phoneNumber : myphoneNumber, socketId : socketId}),
      headers : {'content-type' : 'application/json'}
    })

    let data = await res.json()
    console.log(data)
    console.log(res.body)
    getUsersContacts(myphoneNumber)

  }

    const getUsersContacts = async (number : any) => {
      let res = await fetch(uri + '/user/' + number, {
      method : 'GET',
      headers : {'content-type' : 'application/json'}
    })

    let data = await res.json()
    setMyAvatar(data.avatar)
    console.log(data.avatar)

      data.contactsList.forEach((element : Array<Object>) => {
      console.log(element)
    })

    setContactsList(data.contactsList)

  }


  const getUser = async () => {
    let number = prompt('type phone number','')

    if(number !== myphoneNumber) {

      let res = await fetch(uri + '/user/' + number, {
        method : 'GET',
        headers : {'content-type' : 'application/json'}
      })
  
      let data = await res.json()
      setPhoneNumberChat(data.phoneNumber)
      setSocketIdChat(data.socketId)

    } else {
      alert("Enter different phone number");
    }

  }

  const getUserFromList = async (number : number) => {
    let res = await fetch(uri + '/user/' + number, {
      method : 'GET',
      headers : {'content-type' : 'application/json'}
    })

    let data = await res.json()
    setPhoneNumberChat(data.phoneNumber)
    setSocketIdChat(data.socketId)
    setChosenContact(data)

  }


  const sendMsg = (e : any)=> {
    if(e.key == 'Enter') {
      socket.emit('messages', {socketId : socketIdChat, phoneNumberChat: phoneNumberChat, message : message, from : {
        socketId : mySocketId, phoneNumber : myphoneNumber
      }})

      setLastMessage(message)
      setMessage('')
      const chatBody = document.getElementById('chat-body')
      chatBody!.innerHTML += '<span class="messages-out">' + message + '</span><br/>'
      }}
      

  useEffect(()=> {
    socket.on('connect',()=>{
      console.log(socket.connected)
      console.log('connected id' + socket.id)
      setMysocketId(socket.id)
      updateUser(socket.id)
    })

    socket.on('messages', (data : any)=>{

      setLastMessage(data.message)
      const chatBody = document.getElementById('chat-body')
      chatBody!.innerHTML += '<span class="messages-in">' + data.message + '</span><br/>'

    })

    return () => {
      socket.off('connect')
      socket.off('messages')
    }
  },[])



  return (
      <div className='app'>
            <div className='app-body'>

                <div className='sidebar'>
                  <div className='sidebar-header'>
                          <Avatar color='action' src={myAvatar}/>
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
                  <div className='sidebar-list'   >

                    {contactsList.map((contact : any, index : number) =>
                    <span key={index} onClick={() => getUserFromList(contact.phoneNumber) }>
                      <ChatItem avatar={contact.avatar} title={contact.name} lastMessage={contact.lastMessage}/>
                    </span>)}

                  </div>
                  
                </div>

                <div className='chat'>
                  <div className="bg-chat"></div>
                  <div className="chat-header">
                    <Avatar id='image1' src={chosenContact.name.length > 1 ? chosenContact.avatar : myAvatar} />
                    <div className="chat-header-info">
                        <span className='title'>{chosenContact.name}</span><br/>
                        <span className='info'>last seen at 05:00</span>
                    </div>
                    <div className="chat-header-right">
                        <SearchIcon color='action'/>
                        <MoreVertIcon color='action'/>
                    </div>
                  </div>
                  <div id='chat-body' className="chat-body">

                  </div>
                  <div className="chat-footer">
                    <div className="chat-footer-actions">
                        <InsertEmoticonIcon color='action'/>
                        <AttachFileIcon color='action'/>
                    </div>
                    <div className="chat-footer-input">
                      <input placeholder='Type a message'
                      value={message}
                      onKeyDown={sendMsg}
                      onChange={(e) => setMessage(e.target.value)}
                      />
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
