import './chat-body.css'
import { useEffect, useState } from 'react';

function ChatBody (props : any) {
    
     const [renderedMessages, setRenderedMessages] = useState<any[]>([]);

    useEffect( ()=> {  
        
        if(props.chatInfo.length >=1) {
        
        const messages = props.chatInfo.map((message : any, index : number) => 
      
        message.from_number == props.myID ? 

        <div key={index} className='msg-out'>
          { <div > <small className='sent-at'> {message.sent_time}</small> <span className="messages-out">{message.message_text}</span> </div>  }
        </div> : 

        <div key={index} className='msg-in'>
        { <div > <span className='messages-in'>{message.message_text}</span> <small className='sent-at'>{message.sent_time}</small></div>  }
        </div>
       
        )


        console.log(messages)
        setRenderedMessages(messages)

        }
    
    },[props.chatInfo])

    return (

        <div id='chat-body' className='chat-body'>
            {props.chatInfo.length >= 1 ? renderedMessages : <></>}
        </div>

    )

}

export default ChatBody;
