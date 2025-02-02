import './chat-body.css'
import { useEffect } from 'react';

const uri = 'http://localhost:3000'

function ChatBody (props : any) {

    // useEffect( ()=> {

    //     if(props.messageReceived != '') {

    //     const time = new Date();
    //     const currentHour = time.getHours().toString().padStart(2, '0');
    //     const currentMinute = time.getMinutes().toString().padStart(2, '0');

    //     const chatBody = document.getElementById('chat-body')
    //     chatBody!.innerHTML += '<div class="msg-in"> <span class="messages-in">' + props.messageReceived + '</span> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small></div><br/>'

    //     }
    
    // },[props.messageReceived])


    // useEffect( ()=> {

    //     if(props.message != '') {

    //     const time = new Date();
    //     const currentHour = time.getHours().toString().padStart(2, '0');
    //     const currentMinute = time.getMinutes().toString().padStart(2, '0');

    //     const chatBody = document.getElementById('chat-body')
    //     chatBody!.innerHTML += '<div class="msg-out"> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small> <span class="messages-out">' + props.message + '</span> </div><br/>'

    //     }
        
    // },[props.message])


    const getAllMessages = async () => {

        console.log(props.myID)
        console.log(props.contactedId)
    
        let res = await fetch(uri + '/chats/' + props.myID + '/' + props.contactedId, {
        method : 'GET',
        headers : {'content-type' : 'application/json'}
      })
    
      let data = await res.json()
      console.log(data.content)
      console.log(data.content.length)
      return data.content; // retrieving the last message from each chat
    
    }

    useEffect( ()=> {

        console.log(props.chatInfo)

        let myChatInfo = getAllMessages()

        myChatInfo.then((res) => {
            console.log(res)
        })
     

        if(props.chatInfo.length >=1) {

        const time = new Date();
        const currentHour = time.getHours().toString().padStart(2, '0');
        const currentMinute = time.getMinutes().toString().padStart(2, '0');

        console.log(props.myID)
        console.log(props.contactedId)

        // const chatBody = document.getElementById('chat-body')

        // if(props.chatInfo[props.chatInfo.length-1].from_number == props.myID) {
        //     chatBody!.innerHTML += '<div class="msg-out"> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small> <span class="messages-out">' + props.chatInfo[props.chatInfo.length-1].message_text + '</span> </div><br/>'
        // } else {
        //     chatBody!.innerHTML += '<div class="msg-in"> <span class="messages-in">' + props.chatInfo[props.chatInfo.length-1].message_text + '</span> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small></div><br/>'
        // }
        
        props.chatInfo.forEach((message : any) => {
            console.log(message)

        const chatBody = document.getElementById('chat-body')

        if(message.from_number == props.myID) {
             chatBody!.innerHTML += '<div class="msg-out"> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small> <span class="messages-out">' + message.message_text + '</span> </div><br/>'
        } else {
            chatBody!.innerHTML += '<div class="msg-in"> <span class="messages-in">' + message.message_text + '</span> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small></div><br/>'
        }
        
        })

        }
    
    },[props.chatInfo])

    return (

        
        <div id='chat-body' className="chat-body">



        </div>

    )

}

export default ChatBody;
