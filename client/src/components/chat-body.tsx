import './chat-body.css'
import { useEffect, useState } from 'react';

function ChatBody (props : any) {
    
     const [renderedMessages, setRenderedMessages] = useState<any[]>([]);

    useEffect( ()=> {  
        
        if(props.chatInfo.length >=1) {

        const time = new Date();
        const currentHour = time.getHours().toString().padStart(2, '0');
        const currentMinute = time.getMinutes().toString().padStart(2, '0');
        
        const messages = props.chatInfo.map((message : any, index : number) => {
            console.log(message)

        const chatBody = document.getElementById('chat-body')

        {message.from_number == props.myID ? <div className='msg-out'> <small className='sent-at'> {currentHour} + ":" + {currentMinute} + '</small> <span className="messages-out">' + {message.message_text} + '</span> </div> :
        <div className='msg-in'> <span className='messages-in'> + {message.message_text} + </span> <small className='sent-at'> + {currentHour} + ":" + {currentMinute} + </small></div>}
 
        })


        setRenderedMessages(messages)

        }
    
    },[props.chatInfo])

    return (

        
        <div id='chat-body' className="chat-body">
            {props.chatInfo.length >= 1 ? renderedMessages : <></>}
        </div>

    )

}

export default ChatBody;
