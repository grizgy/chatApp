import './App.css'
import Chat from './components/chat'

import { io } from 'socket.io-client'

const socket = io("localhost:3000")

function App() {

  return (

    <div className='parent'>

        <div id='left'>
          
        </div>

        <div id='right'>
          <Chat></Chat>
        </div>
     
    </div>
    
  )
}

export default App
