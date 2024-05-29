const express = require('express')
const app = express();
const server = require('http').createServer(app)
const db = require ('./db')
const Server = require('socket.io');
const cors = require('cors')
const io = Server(server, {
  cors:{
    origin : 'http://localhost:3001',
    methods : ['GET','PUT', 'POST']
  }
})




db.init()
app.use(cors())
app.use(express.json())


server.listen(3000, () => {
  console.log(`Listen on 3000`);
}); 

// app.get('/', (req : any, res : any) => {
//   res.send('working')
// })


app.get('/user/:phoneNumber', async (req : any, res : any) => {
  const user = await db.User.findOne({phoneNumber : req.params.phoneNumber}).exec()
  res.send(user)
})


// app.put('/user', async (req : any, res : any) => {
//   const result = await db.User.updateOne({phoneNumber : req.body.phoneNumber}, {socketId : req.body.socketId})
//   res.send(result)
// })

app.post('/user', async (req : any, res : any) => {
        const newUser = await db.User.create({ phoneNumber: req.body.phoneNumber, socketId: '' });
        await newUser.save();
        res.status(201).json(newUser);
});



interface ConnectedUsers {
  [key: string]: Array<any>;
}

const connectedUsers : ConnectedUsers  = {};


io.on('connection', (socket : any) => {

  const userId = socket.handshake.query.userId;

  if (!connectedUsers[userId]) {
    connectedUsers[userId] = [];
  }

  connectedUsers[userId].push({socketId: socket.id, phoneNumber: userId})

  console.log(connectedUsers[userId])

  console.log(socket.id);
  console.log('A user connected');


  socket.on('messages',(data : any)=> {

    if (connectedUsers[data.phoneNumberChat] && Array.isArray(connectedUsers[data.phoneNumberChat])) { 
      const recipientSocket = connectedUsers[data.phoneNumberChat].filter(user => user.phoneNumber === data.phoneNumberChat); 
      const senderSocket = connectedUsers[userId].filter(user => user.phoneNumber === userId); 

      // console.log("I AM REC")
      // console.log(recipientSocket)

      // console.log("I AM SENDER")
      // console.log(senderSocket)
      
      if(recipientSocket){

        recipientSocket.forEach(socket => {
          io.to(socket.socketId).emit('messages', data);
      });

      } else {
        console.log('Recipient is not connected');
      }

    } else {
      console.log(`Invalid data for socketId: ${data.socketId}`);
    }

  })
  
  socket.on('disconnect', () => { 
    const index = connectedUsers[userId].findIndex(user => user.socketId === socket.id); 
    if (index !== -1) { 
      connectedUsers[userId].splice(index, 1); 
    } 
  }); 
  
})