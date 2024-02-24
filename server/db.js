const {Mongose, Schema, model, default: mongoose} = require('mongoose') 

const uri_db = 'mongodb://localhost/chatAppDB'

const UserSchema = new Schema({
    name : String,
    phoneNumber : String,
    contactsList : [],
    socketId : String
})

const userModel = new model ('User', UserSchema)

module.exports.User = userModel

module.exports.init = async () => {
    await mongoose.connect(uri_db)
    await userModel.deleteMany({})

    const Georgi = await new userModel({name : 'Georgi', phoneNumber : '+3591234567'}).save()
    const Ivan = await new userModel({name : 'Ivan', phoneNumber : '+3597654321'}).save()
    const Petkan = await new userModel({name : 'Petkan', phoneNumber : '2'}).save()
    const Toni = await new userModel({name : 'Toni', phoneNumber : '3'}).save()
    const Georgina = await new userModel({name : 'Georgina', phoneNumber : '+4444444444'}).save()

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