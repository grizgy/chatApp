const express = require('express')
const app = express();
const server = require('http').createServer(app)
const db = require ('./db')
const Server = require('socket.io');
const cors = require('cors')
const io = Server(server, {
  cors:{
    origin : 'http://localhost:3001/',
    methods : ['GET','PUT']
  }
})

db.init()
app.use(cors())
app.use(express.json())

app.listen(3000, () => {
  console.log(`Listen on 3000`);
}); 

// app.get('/', (req : any, res : any) => {
//   res.send('working')
// })


app.get('/user/:phoneNumber', async (req : any, res : any) => {
  const user = await db.user.findOne({phoneNumber : req.params.phoneNumber}).exec()
  res.send(user)
})


// app.put('/user', async () => {
//   const result = await db.user.updateOne({phoneNumber : req.body.phoneNumber}, {socketId : req.body.socketId})
//   res.send(result)
// })