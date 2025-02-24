import { Avatar } from '@mui/material';
import './chat-item.css'

function ChatItem (props : any) {

    return (
        <div className="chat-item">
            <span/>
            <Avatar src={props.avatar}/>
            <div className="item-info">
                <span className='title'>{props.title}</span><br/>
                <span id={props.name}>{props.lastMessage.substring(0, 45)}</span>
            </div>
        </div>
    )

}

export default ChatItem;