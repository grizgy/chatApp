const {Mongose, Schema, model, default: mongoose} = require('mongoose') 

const uri_db = 'mongodb://localhost:27017/chatAppDB'
// const uri_db = 'mongodb://mongodb-app:27017'

const ChatSchema = new Schema({
    content : [{
        from_number : String,
        to_number : String,
        message_text : String,
        sent_time : String
    }]
})


const UserSchema = new Schema({
    // chat_ID : ChatSchema, 
    name : String,
    phoneNumber : String,
    contactsList : [],
    socketId : String,
    avatar : String
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

    const GeorgiIvan = await new chatModel({ content: [{from_number : Georgi.phoneNumber, to_number : Ivan.phoneNumber, message_text : "ZDR. Vanka", sent_time : "14:25"}] }).save()
    const GeorgiPetkan = await new chatModel({ content: [{from_number : Georgi.phoneNumber, to_number : Petkan.phoneNumber, message_text : "ZDR. Petkan", sent_time : "14:25"}] }).save()
    const GeorgiToni = await new chatModel({ content: [{from_number : Georgi.phoneNumber, to_number : Ivan.phoneNumber, message_text : "ZDR. Tonka", sent_time : "14:25"}] }).save()
    const GeorgiGeorgina = await new chatModel({ content: [{from_number : Georgi.phoneNumber, to_number : Georgina.phoneNumber, message_text : "ZDR. Georgina", sent_time : "14:25"}] }).save()

    const IvanPetkan = await new chatModel({ content: [{from_number : Ivan.phoneNumber, to_number : Petkan.phoneNumber, message_text : "ZDR. Petkan", sent_time : "14:25"}] }).save()
    const IvanToni = await new chatModel({ content: [{from_number : Ivan.phoneNumber, to_number : Toni.phoneNumber, message_text : "ZDR. Toni", sent_time : "14:25"}] }).save()
    const IvanGeorgina = await new chatModel({ content: [{from_number : Ivan.phoneNumber, to_number : Georgina.phoneNumber, message_text : "ZDR. Georgina", sent_time : "14:25"}] }).save()


    const PetkanToni = await new chatModel({ content: [{from_number : Petkan.phoneNumber, to_number : Toni.phoneNumber, message_text : "ZDR. Tonkaaaa", sent_time : "14:25"}] }).save()
    const PetkanGeorgina = await new chatModel({ content: [{from_number : Petkan.phoneNumber, to_number : Georgina.phoneNumber, message_text : "ZDR. Georginaaaaaaaaa", sent_time : "14:25"}] }).save()

    const ToniGeorgina = await new chatModel({ content: [{from_number : Toni.phoneNumber, to_number : Georgina.phoneNumber, message_text : "ZDR. Georginaaaaaaaaa", sent_time : "14:25"}] }).save()


    // await userModel.findByIdAndUpdate(Georgi._id, { $push: {
    //     contactsList : { $each : [{id: GeorgiIvan._id, contact: Ivan }, {id: GeorgiPetkan._id, contact: Petkan }, {id: GeorgiToni._id, contact: Toni }, {id: GeorgiGeorgina._id, contact: Georgina }]}
    // }});

    // await userModel.findByIdAndUpdate(Ivan._id, { $push: {
    //     contactsList : { $each : [{id: GeorgiIvan._id, contact: Georgi}, {id: IvanPetkan._id, contact: Petkan}, {id: IvanToni._id, contact: Toni}, {id: IvanGeorgina._id, contact: Georgina}]}
    // }});


    // await userModel.findByIdAndUpdate(Petkan._id, { $push: {
    //     contactsList : { $each: [{id: GeorgiPetkan._id, contact: Georgi}, {id: IvanPetkan._id, contact: Ivan}, {id: PetkanToni._id, contact: Toni}, {id: PetkanGeorgina._id, contact: Georgina}]}
    // }});


    // await userModel.findByIdAndUpdate(Toni._id, { $push: {
    //     contactsList : {$each : [{id: GeorgiToni._id, contact: Georgi}, {id: IvanToni._id, contact: Ivan}, {id: PetkanToni._id, contact: Petkan}, {id: ToniGeorgina._id, contact: Georgina}]} 
    //     }});


    // await userModel.findByIdAndUpdate(Georgina._id, { $push: {
    //     contactsList : {$each : [{id: GeorgiGeorgina._id, contact: Georgi}, {id: IvanGeorgina._id, contact: Ivan}, {id: PetkanGeorgina._id, contact: Petkan}, {id: ToniGeorgina._id, contact: Toni}]}
    //     }});



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