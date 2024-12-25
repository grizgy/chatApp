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
import ChatBody from './components/chat-body';


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
  const [contactsList, setContactsList] = useState([{avatar : '', contactsList: [], name : '', phoneNumber: '', _id: '', lastMessage: ''}])
  const [chosenContact, setChosenContact] = useState({name : '', phoneNumber : '', avatar : ''})
  const [myAvatar, setMyAvatar] = useState('');
  const [renderedContacts, setRenderedContacts] = useState<any[]>([]);

  const [messageReceived,setMessageReceived] = useState('')
  const [messageSent,setMessageSent] = useState('')

  const [contactedId, setContactedId] = useState('')

  const updateUser = async (socketId : any) => {
    let res = await fetch(uri + '/user', {
      method : 'PUT',
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
    console.log(data.contactsList)


    const contactsWithLastMessages = await Promise.all(data.contactsList.map(async (element: any) => {
      let lastMessage = await getLastMessage(element.phoneNumber);
      element.lastMessage = lastMessage;
      return element; // Return the updated element
    }));

    setContactsList(data.contactsList)

    let lastMessage;

    if(phoneNumberChat !== '') {
      console.log(phoneNumberChat)
       lastMessage = await getLastMessage(phoneNumberChat)
    } else {
      console.log(data.contactsList[0])
      setPhoneNumberChat(data.contactsList[0])
       lastMessage = await getLastMessage(data.contactsList[0].phoneNumber)
    }

      console.log(lastMessage)


  }


  const getUser = async () => {
    let number = prompt('type phone number','')

    if(number !== myphoneNumber) {

      let res = await fetch(uri + '/user/' + number, {
        method : 'GET',
        headers : {'content-type' : 'application/json'}
      })
  
      let data = await res.json()
      console.log(typeof data)
      console.log(data.phoneNumber)
      console.log(data.socketId)
      setContactedId(data.socketId)
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


  const sendMsg = async (e : any)=> {
    if(e.key == 'Enter') {
      if(message.trim() !== '') { 

        let res = await fetch(uri + '/chats', {
          method : 'PUT',
          body : JSON.stringify({phoneNumberChat : phoneNumberChat, message: message, phoneNumber : myphoneNumber}),
          headers : {'content-type' : 'application/json'}
        })
  
  
        let data = await res.json()
        console.log(data)

        console.log(myphoneNumber)
        console.log(phoneNumberChat)

        getUsersContacts(myphoneNumber)

        let contact;

        if(phoneNumberChat !== null) {
          contact = phoneNumberChat
          console.log("phoneNumberChat doesn't exist")
        } else{
          contact = contactsList[0].phoneNumber
          console.log("phoneNumberChat exists")
        }

        console.log(contact)

        socket.emit('messages', {socketId : socketIdChat, phoneNumberChat: phoneNumberChat, message : message, from : {
          socketId : mySocketId, phoneNumber : myphoneNumber
        }})
  
        setMessageSent(message)
        setMessage('')
       }}}
       

  useEffect(()=> {

    if(contactsList[0] && Object.keys(contactsList[0]).length > 0) {


      console.log(contactsList[0].avatar)
      

      const renderContacts  = contactsList.map((contact : any, index : number) =>
        <span key={index} onClick={() => getUserFromList(contact.phoneNumber) }>
          { <ChatItem avatar={contactsList[index].avatar} title={contactsList[index].name}  lastMessage={contactsList[index].lastMessage}/>  }
          {/* get the last message from the chatID */}
        </span>)

      setRenderedContacts(renderContacts)

    }

    console.log("ContactsList changed")

  }, [contactsList])     

  useEffect(()=> {
    socket.on('connect',()=>{
      console.log(socket.connected)
      console.log('connected id ' + socket.id)
      setMysocketId(socket.id)
      updateUser(socket.id)
    })

    socket.on('messages', (data : any)=>{

      getUsersContacts(myphoneNumber)
      setMessageReceived(data.message)
      setSocketIdChat(data.from.socketId)
      console.log(data)

    })

    return () => {
      socket.off('connect')
      socket.off('messages')
    }
  },[])


  const getLastMessage = async (contactedNumber : any) => {

    let res = await fetch(uri + '/chats/' + myphoneNumber + '/' + contactedNumber, {
    method : 'GET',
    headers : {'content-type' : 'application/json'}
  })

  let data = await res.json()
  const length = data.content.length 
  setPhoneNumberChat(contactedNumber)
  return data.content[length-1].message_text; // retrieving the last message from each chat

}


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
                  {renderedContacts}
                </div>

                <div className='chat'>
                  <div className="bg-chat"></div>
                  <div className="chat-header">
                    {/* <Avatar id='image1' src={chosenContact.name.length > 1 ? chosenContact.avatar : contactsList[0].avatar} /> */}
                    <div className="chat-header-info">
                        {/* <span className='title'>{ chosenContact.name.length > 1 ?  chosenContact.name : contactsList[0].name}</span><br/> */}
                        <span className='info'>last seen at 05:00</span>
                    </div>
                    <div className="chat-header-right">
                        <SearchIcon color='action'/>
                        <MoreVertIcon color='action'/>
                    </div>
                  </div>

                    <ChatBody id='chat-body' className="chat-body" chosenContact={socketIdChat} message={messageSent} messageReceived={messageReceived}>
                    </ChatBody>
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
                </div>
            
            </div>
        </div> 
  )
}

export default App
