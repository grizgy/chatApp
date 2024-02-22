const {Mongose, Schema, model, default: mongoose} = require('mongoose') 

const uri_db = 'mongodb://localhost/chatAppDB'

const UserSchema = new Schema({
    name : String,
    phoneNumber : String,
    contactsList : [{String}],
    socketId : String
})

const userModel = new model ('User', UserSchema)

module.exports.User = userModel

module.exports.init = async () => {
    await mongoose.connect(uri_db)
    await userModel.deleteMany({})

    const Georgi = await new userModel({name : 'Georgi', phoneNumber : '+3591234567', contactsList : [] }).save()
    const Ivan = await new userModel({name : 'Ivan', phoneNumber : '+3597654321', contactsList : []}).save()
    const Petkan = await new userModel({name : 'Petkan', phoneNumber : '2', contactsList : []}).save()
    const Toni = await new userModel({name : 'Toni', phoneNumber : '3', contactsList : []}).save()
    const Georgina = await new userModel({name : 'Georgina', phoneNumber : '+4444444444', contactsList : []}).save()

    await userModel.findByIdAndUpdate(Georgi._id, { $push: {
        contactsList : [ Ivan, Petkan, Toni, Georgina
    ]}});


    await userModel.findByIdAndUpdate(Ivan._id, { $push: {
        contactsList : [ Georgi, Petkan, Toni, Georgina
    ]}});


    await userModel.findByIdAndUpdate(Petkan._id, { $push: {
        contactsList : [ Georgi, Ivan, Toni, Georgina
    ]}});


    await userModel.findByIdAndUpdate(Toni._id, { $push: {
        contactsList : [ Georgi, Ivan, Petkan, Georgina
    ]}});


    await userModel.findByIdAndUpdate(Georgina._id, { $push: {
        contactsList : [ Georgi, Ivan, Petkan, Toni
    ]}});

    console.log('db ready')
}