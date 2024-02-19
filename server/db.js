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
    
    const Georgi = {name : 'Georgi', phoneNumber : '+3591234567', contactsList : [] }
    const Ivan = {name : 'Ivan', phoneNumber : '+3597654321', contactsList : []}
    const Petkan = {name : 'Petkan', phoneNumber : '+2222222222', contactsList : []}
    const Toni = {name : 'Toni', phoneNumber : '+3333333333', contactsList : []}
    const Georgina = {name : 'Georgina', phoneNumber : '+4444444444', contactsList : []}

    await new userModel(Georgi).save()
    await new userModel(Ivan).save()
    await new userModel(Petkan).save()
    await new userModel(Toni).save()
    await new userModel(Georgina).save()

    // const cur = "asdfg"
    // const cur = (await userModel.findOne({phoneNumber: "+3597654321"}))
    // console.log(userModel.findOne({phoneNumber: '+3597654321'}))

    await userModel.updateOne({phoneNumber : "+3591234567"}, {$push : {
        contactsList : [await userModel.findOne({phoneNumber: "+3597654321"}), 
                        await userModel.findOne({phoneNumber: "+2222222222"}),
                        await userModel.findOne({phoneNumber: "+3333333333"})]
    }})



    await userModel.updateOne({phoneNumber : "+3597654321"}, {$push : {
        contactsList : [await userModel.findOne({phoneNumber: "+3591234567"}),
                        await userModel.findOne({phoneNumber: "+2222222222"}),
                        await userModel.findOne({phoneNumber: "+3333333333"}),
                        await userModel.findOne({phoneNumber: "+4444444444"})]
    }})


    await userModel.updateOne({phoneNumber : "+2222222222"}, {$push : {
        contactsList : [await userModel.findOne({phoneNumber: "+3591234567"}),
                        await userModel.findOne({phoneNumber: "+3333333333"}),
                        await userModel.findOne({phoneNumber: "+4444444444"})]
    }})


    await userModel.updateOne({phoneNumber : "+3333333333"}, {$push : {
        contactsList : [await userModel.findOne({phoneNumber: "+3591234567"}),
                        await userModel.findOne({phoneNumber: "+2222222222"}),
                        await userModel.findOne({phoneNumber: "+3333333333"}),
                        await userModel.findOne({phoneNumber: "+4444444444"})]
    }})


    await userModel.updateOne({phoneNumber : "+4444444444"}, {$push : {
        contactsList : [await userModel.findOne({phoneNumber: "+3591234567"}),
                        await userModel.findOne({phoneNumber: "+2222222222"}),
                        await userModel.findOne({phoneNumber: "+3333333333"})]
    }})

    console.log('db ready')
}