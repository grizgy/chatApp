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
import { useEffect, useState, useRef } from 'react';
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
  const [contactsList, setContactsList] = useState([{avatar : '', contactsList: [], name : '', phoneNumber: '', _id: '', lastMessage: ''}])
  const [myContact, setMyContact] = useState({avatar : '', contactsList: [], name : '', phoneNumber: '', _id: '', lastMessage: ''})
  const [contactsListContacted, setContactsListContacted] = useState([{avatar : '', contactsList: [], name : '', phoneNumber: '', _id: '', lastMessage: ''}])
  const [chosenContact, setChosenContact] = useState({avatar : '', contactsList: [], name : '', phoneNumber: '', _id: '', lastMessage: ''})
  const myID = useRef('');
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
    console.log(data)
    setMyContact(data)
    setMyAvatar(data.avatar)
    console.log(data._id)
    myID.current = data._id
    console.log(data.contactsList)

    const contactsWithLastMessages = await Promise.all(data.contactsList.map(async (element: any) => {
      let lastMessage = await getLastMessage(element._id);
      element.lastMessage = lastMessage;
      console.log(lastMessage)
      console.log(element)
      return element; // Return the updated element
    }));

    console.log(data.contactsList)
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
      console.log(data)
      setChosenContact(data)
      setContactsListContacted(data.contactsList)
      setContactedId(data._id)
      setPhoneNumberChat(data.phoneNumber)
      setSocketIdChat(data.socketId)

    } else {
      alert("Enter different phone number");
    }

  }

  const getUserFromList = async (number : any) => {
    let res = await fetch(uri + '/user/' + number, {
      method : 'GET',
      headers : {'content-type' : 'application/json'}
    })

    let data = await res.json()
    setContactsListContacted(data.contactsList)
    setContactedId(data._id)
    console.log(contactsListContacted)
    console.log(contactsList)
    setPhoneNumberChat(data.phoneNumber)
    console.log(phoneNumberChat)
    setSocketIdChat(data.socketId)
    setChosenContact(data)

  }


  const sendMsg = async (e : any)=> {
    if(e.key == 'Enter') {
      if(message.trim() !== '') { 

        let res = await fetch(uri + '/chats', {
          method : 'PUT',
          body : JSON.stringify({contactedId : contactedId, message: message, myID : myID.current}),
          headers : {'content-type' : 'application/json'}
        })

        console.log(contactedId)
        console.log(myID.current)
  
  
        let data = await res.json()
        console.log(data)
        console.log(myphoneNumber)
        console.log(phoneNumberChat)
        console.log(contactsList)
        console.log(chosenContact)
        console.log(contactsListContacted)

        let elementExists = contactsList.some( (element) => element._id === contactedId)
        
        if(elementExists) {
          contactsList.forEach(function(item : any, index : number) {

            console.log(item)
              console.log(contactedId)
  
            if(item._id === contactedId) {
  
              console.log(item)
              console.log(contactedId)
              contactsList.splice(index, 1) // Remove the element from its original position
              contactsList.unshift(item)    // Insert the element at the beginning of the array
  
              replaceElementInDB(contactsList, myphoneNumber)  // function to put the last contacted chat on the top of the DB
  
            }
          })
            } else {

              chosenContact.contactsList = []
              contactsList.push(chosenContact)
              console.log(contactsList)
              contactsList.splice(contactsList.length-1, 1)
              contactsList.unshift(chosenContact)
              setContactsList(contactsList)
              replaceElementInDB(contactsList, myphoneNumber)
            }


        console.log(contactsList)
        console.log(myID.current)

        let elementExistsReceiver = contactsListContacted.some( (element) => element._id === myID.current)

        console.log(elementExistsReceiver)
        if(elementExistsReceiver) {

          contactsListContacted.forEach(function(item : any, index : number) {
            if(item._id === myID.current) {
  
              console.log(item)
              console.log(myID.current)
              contactsListContacted.splice(index, 1) // Remove the element from its original position
              contactsListContacted.unshift(item)    // Insert the element at the beginning of the array
  
              replaceElementInDB(contactsListContacted, phoneNumberChat)  // function to put the last contacted chat on the top of the DB
  
            }
          })

        } else {

              myContact.contactsList = []
              contactsListContacted.push(myContact)
              console.log(contactsListContacted)
              contactsListContacted.splice(contactsListContacted.length-1, 1)
              contactsListContacted.unshift(myContact)
              setContactsListContacted(contactsListContacted)
              replaceElementInDB(contactsListContacted, phoneNumberChat)
              console.log(contactsListContacted)

        }

        

        console.log(contactsListContacted)

        console.log(myphoneNumber)
        getUsersContacts(myphoneNumber)

        console.log(contactsList)

        socket.emit('messages', {socketId : socketIdChat, phoneNumberChat: phoneNumberChat, message : message, from : {
          socketId : mySocketId, phoneNumber : myphoneNumber
        }})
  
        setMessageSent(message)
        setMessage('')
       }}}


       const replaceElementInDB = async (arr : any[], phoneNumber : any )=> {

        let res = await fetch(uri + '/user', {
          method : 'PATCH',
          body : JSON.stringify({newArray : arr, phoneNumber : phoneNumber}),
          headers : {'content-type' : 'application/json'}
        })

        let data = await res.json()
        console.log(data)


       }
       

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
    console.log(contactsList)

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
      console.log(contactsListContacted)
      console.log(data)

    })

    return () => {
      socket.off('connect')
      socket.off('messages')
    }
  },[])


  const getLastMessage = async (contactedID : any) => {

    console.log(myID.current)
    console.log(contactedID)

    let res = await fetch(uri + '/chats/' + myID.current + '/' + contactedID, {
    method : 'GET',
    headers : {'content-type' : 'application/json'}
  })

  let data = await res.json()
  console.log(data)
  const length = data.content.length 
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
