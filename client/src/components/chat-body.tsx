import './chat-body.css'
import { useEffect } from 'react';


function ChatBody (props : any) {

    useEffect( ()=> {

        if(props.messageReceived != '') {

        const time = new Date();
        const currentHour = time.getHours().toString().padStart(2, '0');
        const currentMinute = time.getMinutes().toString().padStart(2, '0');

        const chatBody = document.getElementById('chat-body')
        chatBody!.innerHTML += '<div class="msg-in"> <span class="messages-in">' + props.messageReceived + '</span> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small></div><br/>'

        }
    
    },[props.messageReceived])


    useEffect( ()=> {

        if(props.message != '') {

        const time = new Date();
        const currentHour = time.getHours().toString().padStart(2, '0');
        const currentMinute = time.getMinutes().toString().padStart(2, '0');

        const chatBody = document.getElementById('chat-body')
        chatBody!.innerHTML += '<div class="msg-out"> <small class="sent-at">' + currentHour + ":" + currentMinute + '</small> <span class="messages-out">' + props.message + '</span> </div><br/>'

        }
        
    },[props.message])


    return (

        
        <div id='chat-body' className="chat-body">



        </div>

    )

}

export default ChatBody;
