const {Mongose, Schema, model, default: mongoose} = require('mongoose') 

const uri_db = 'mongodb://localhost/chatAppDB'

const UserSchema = new Schema({
    name : String,
    phoneNumber : String,
    socketId : String
})

const userModel = new model ('User', UserSchema)

module.exports.init = async () => {
    await mongoose.connect(uri_db)
    await userModel.deleteMany({})
    await new userModel({name : 'Georgi', phoneNumber : '+3591234567'}).save()
    await new userModel({name : 'Ivan', phoneNumber : '+3597654321'}).save()
    console.log('db ready')
}