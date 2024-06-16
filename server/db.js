const {Mongose, Schema, model, default: mongoose} = require('mongoose') 

const uri_db = 'mongodb://localhost/chatAppDB'
// const uri_db = 'mongodb://mongodb-app:27017'

const UserSchema = new Schema({
    // chat_ID : ChatSchema, 
    name : String,
    phoneNumber : String,
    contactsList : [],
    socketId : String,
    avatar : String
})


const ChatSchema = new Schema({
    content : [{
        from_number : String,
        to_number : String,
        message_text : String,
        sent_time : String
    }]
})


const userModel = new model ('User', UserSchema)

const chatModel = new model ('Chat', ChatSchema)

module.exports.User = userModel

module.exports.Chat = chatModel

module.exports.init = async () => {
    await mongoose.connect(uri_db)


    await userModel.deleteMany({})
    await chatModel.deleteMany({})



    const Georgi = await new userModel({name : 'Georgi', phoneNumber : '+3591234567', avatar : 'Georgi.jpg'}).save()
    const Ivan = await new userModel({name : 'Ivan', phoneNumber : '+3597654321', avatar : 'Ivan.jpg'}).save()
    const Petkan = await new userModel({name : 'Petkan', phoneNumber : '2', avatar : 'Petkan.jpg'}).save()
    const Toni = await new userModel({name : 'Toni', phoneNumber : '3', avatar : 'Toni.jpg'}).save()
    const Georgina = await new userModel({name : 'Georgina', phoneNumber : '+4444444444', avatar : 'Georgina.jpg'}).save()

    await userModel.findByIdAndUpdate(Georgi._id, { $push: {
        contactsList : { $each : [Ivan, Petkan, Toni, Georgina]}
    }});


    await userModel.findByIdAndUpdate(Ivan._id, { $push: {
        contactsList : { $each : [Georgi, Petkan, Toni, Georgina]}
    }});


    await userModel.findByIdAndUpdate(Petkan._id, { $push: {
        contactsList : { $each: [Georgi, Ivan, Toni, Georgina]}
    }});


    await userModel.findByIdAndUpdate(Toni._id, { $push: {
        contactsList : {$each : [Georgi, Ivan, Petkan, Georgina]} 
        }});


    await userModel.findByIdAndUpdate(Georgina._id, { $push: {
        contactsList : {$each : [Georgi, Ivan, Petkan, Toni]}
        }});
        

    console.log('db ready')
}