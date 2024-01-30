import { Avatar } from '@mui/material';
import './chat-item.css'

function ChatItem () {

    return (
        <div className="chat-item">
            <span/>
            <Avatar/>
            <div className="item-info">
                <span className='title'>title</span><br/>
                <span className='info'>info</span>
            </div>
        </div>
    )

}

export default ChatItem;