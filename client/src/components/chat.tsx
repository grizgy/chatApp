import './Chat.css'
import { Avatar } from '@mui/material'

function Chat() {

  return (
   
    <>

        <div id='container'>
            <header id='header'>
              <Avatar id='image1' src="kiro.jpg" />
              <label id='chatName'>Kiro Breka Active</label>
            </header>
            <p id='chatHistory' ></p>
            <input id='inputText'></input>
        </div>

    </>
  )
}

export default Chat