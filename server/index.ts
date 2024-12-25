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


app.get('/user/:phoneNumber', async (req : any, res : any) => {
  const user = await db.User.findOne({phoneNumber : req.params.phoneNumber}).exec()
  res.send(user)
})


app.put('/user', async (req : any, res : any) => {

        const existingUser = await db.User.findOne({phoneNumber : req.body.phoneNumber})

        if(req.body.phoneNumber !== null) {
          if(existingUser) {
            const result = await db.User.updateOne({phoneNumber : req.body.phoneNumber}, {socketId : req.body.socketId})
            res.send(result)
          } else {
            const newUser = await db.User.create({ phoneNumber: req.body.phoneNumber, socketId: req.body.socketId });
            await newUser.save();
            res.status(201).json(newUser);
          }
        }

});




app.put('/chats', async (req : any, res : any) => {
  
  // Find the correct chat !! 
      
      const existingChat = await db.Chat.findOne({
        $or: [
          {
            content: {
              $elemMatch: {
                from_number: req.body.phoneNumber,
                to_number: req.body.phoneNumberChat
              }
            }
          },
          {
            content: {
              $elemMatch: {
                from_number: req.body.phoneNumberChat,
                to_number: req.body.phoneNumber
              }
            }
          }
        ]
      });

      
      const time = new Date();
      const currentHour = time.getHours().toString().padStart(2, '0');
      const currentMinute = time.getMinutes().toString().padStart(2, '0');

    if(existingChat !== null) {
     
      const result = await db.Chat.updateOne(
        { _id: existingChat._id }, 
        { $push: { content: [ {from_number : req.body.phoneNumber, to_number: req.body.phoneNumberChat, message_text : req.body.message, sent_time : currentHour + ":" + currentMinute }] } } // $push to add new message to the content array
    )

      res.send(result)

    } else {

/// TO UPDATE THE NO FIELD AND TO INSERT THE NEW CHAT TO BE YES AFTER SENDING NEW MESSAGE !!!
      const newChat = await db.Chat.create( {content : { from_number: req.body.phoneNumber, to_number: req.body.phoneNumberChat, 
        message_text: req.body.message, sent_time: currentHour + ":" + currentMinute
       }});

       const contactedUser = await db.User.findOne({phoneNumber: req.body.phoneNumberChat} )

      await db.User.updateOne({phoneNumber : req.body.phoneNumber}, 
        { $push: { contactsList: contactedUser}})
        

        const contactingUser = await db.User.findOne({phoneNumber: req.body.phoneNumber})

        await db.User.updateOne({phoneNumber : req.body.phoneNumberChat}, 
         { $push: { contactsList: contactingUser}})


        await newChat.save();
        res.status(201).json(newChat);
    }
 

});


app.get('/chats/:myphoneNumber/:contactedNumber', async (req : any, res : any) => {

  const chat = await db.Chat.findOne({
    $or: [
      {
        content: {
          $elemMatch: {
            from_number: req.params.contactedNumber,
            to_number: req.params.myphoneNumber  
          }
        }
      },
      {
        content: {
          $elemMatch: {
            from_number: req.params.myphoneNumber,  
            to_number: req.params.contactedNumber
          }
        }
      }
    ]
  }).exec()
  res.send(chat)
})


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
      
      if(recipientSocket){

        recipientSocket.forEach(socket => {
          io.to(socket.socketId).emit('messages', data);
      });

      } else {
        console.log('Recipient is not connected');
      }

    } else {

      // set the top contact in the chat as receiver
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