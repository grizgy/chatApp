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



    // MOCK DATA
   const Susi = await new userModel({name:"Susi",phoneNumber:'2114883524',avatar:'https://robohash.org/etsintqui.png?size=50x50&set=set1'}).save()
   const Pam = await new userModel({name:"Pam",phoneNumber:'6268887196',avatar:"https://robohash.org/consequaturetvoluptatem.png?size=50x50&set=set1"}).save()   
   const Ingar = await new userModel({name:"Ingar",phoneNumber:'6533466788',avatar:"https://robohash.org/utconsequaturquo.png?size=50x50&set=set1"}).save()
   const Lexy = await new userModel({name:"Lexy",phoneNumber:'8068602442',avatar:"https://robohash.org/magnimaximevoluptas.png?size=50x50&set=set1"}).save()
   const Audie = await new userModel({name:"Audie",phoneNumber:'6857098806',avatar:"https://robohash.org/impeditexpeditamolestiae.png?size=50x50&set=set1"}).save()


//    const SusiPam = await new chatModel({ content: [{}] }).save()
   const SusiPam = await new chatModel({ content: [
    {from_number : Susi._id, to_number : Pam._id, message_text : "mi sit amet lobortis sapien sapien non mi integer ac", sent_time : "6:32"},
    {from_number: Susi._id, to_number: Pam._id,message_text: "molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus",
    sent_time: "7:27"} ,
    {from_number: Pam._id,
    to_number: Susi._id,
    message_text: "dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis",
    sent_time: "12:38"}, 
    {from_number: Pam._id,
    to_number: Susi._id,
    message_text: "tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla",
    sent_time: "6:09"}
    ] }).save()



    const SusiIngar = await new chatModel({ content: [{from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta",
  sent_time: "11:48"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque",
  sent_time: "9:05"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis",
  sent_time: "1:59"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus",
  sent_time: "12:26"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus",
  sent_time: "10:43"
}] }).save()


const SusiLexy = await new chatModel({ content: [{
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus",
    sent_time: "12:13"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst",
    sent_time: "13:54"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "dui maecenas tristique est et tempus semper est quam pharetra magna",
    sent_time: "13:06"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec",
    sent_time: "3:35"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan",
    sent_time: "1:22"
  }] }).save()

const SusiAudie = await new chatModel({ content: [{
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla",
    sent_time: "16:18"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl",
    sent_time: "7:47"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia",
    sent_time: "5:43"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut",
    sent_time: "12:17"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus",
    sent_time: "20:56"
  }] }).save()


const PamIngar = await new chatModel({ content: [{
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus",
    sent_time: "17:56"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl",
    sent_time: "15:01"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce",
    sent_time: "9:34"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst",
    sent_time: "20:14"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat",
    sent_time: "10:43"
  }] }).save()




    const PamLexy = await new chatModel({ content: [{
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros",
        sent_time: "21:26"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "eu magna vulputate luctus cum sociis natoque penatibus et magnis dis",
        sent_time: "3:48"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat",
        sent_time: "3:45"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum",
        sent_time: "4:39"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et",
        sent_time: "23:47"
      }] }).save()


    const PamAudie = await new chatModel({ content: [{
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit",
        sent_time: "13:37"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl",
        sent_time: "8:39"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus",
        sent_time: "7:39"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum",
        sent_time: "9:54"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "ut at dolor quis odio consequat varius integer ac leo pellentesque",
        sent_time: "4:37"
      }] }).save()

    const IngarLexy = await new chatModel({ content: [{
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac",
        sent_time: "20:50"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue",
        sent_time: "5:24"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus",
        sent_time: "16:11"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget",
        sent_time: "6:21"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet",
        sent_time: "7:02"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi",
        sent_time: "12:58"
      }] }).save()


    const IngarAudie = await new chatModel({ content: [{
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus",
        sent_time: "16:40"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "proin leo odio porttitor id consequat in consequat ut nulla sed accumsan",
        sent_time: "7:54"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin",
        sent_time: "15:41"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam",
        sent_time: "23:47"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "eu mi nulla ac enim in tempor turpis nec euismod",
        sent_time: "14:13"
      }] }).save()

    const LexyAudie = await new chatModel({ content: [{
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis",
        sent_time: "18:29"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac",
        sent_time: "3:52"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus",
        sent_time: "9:51"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut",
        sent_time: "23:14"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam",
        sent_time: "9:42"
      }] }).save()


    const GeorgiIvan = await new chatModel({ content: [{from_number : Georgi._id, to_number : Ivan._id, message_text : "ZDR. Vanka", sent_time : "14:25"}] }).save()
    const GeorgiPetkan = await new chatModel({ content: [{from_number : Georgi._id, to_number : Petkan._id, message_text : "ZDR. Petkan", sent_time : "14:25"}] }).save()
    const GeorgiToni = await new chatModel({ content: [{from_number : Georgi._id, to_number : Toni._id, message_text : "ZDR. Tonka", sent_time : "14:25"}] }).save()
    const GeorgiGeorgina = await new chatModel({ content: [{from_number : Georgi._id, to_number : Georgina._id, message_text : "ZDR. Georgina", sent_time : "14:25"}] }).save()

    const IvanPetkan = await new chatModel({ content: [{from_number : Ivan._id, to_number : Petkan._id, message_text : "ZDR. Petkan", sent_time : "14:25"}] }).save()
    const IvanToni = await new chatModel({ content: [{from_number : Ivan._id, to_number : Toni._id, message_text : "ZDR. Toni", sent_time : "14:25"}] }).save()
    const IvanGeorgina = await new chatModel({ content: [{from_number : Ivan._id, to_number : Georgina._id, message_text : "ZDR. Georgina", sent_time : "14:25"}] }).save()


    // const PetkanToni = await new chatModel({ content: [{from_number : Petkan._id, to_number : Toni._id, message_text : "ZDR. Tonkaaaa", sent_time : "14:25"}] }).save()
    const PetkanGeorgina = await new chatModel({ content: [{from_number : Petkan._id, to_number : Georgina._id, message_text : "ZDR. Georginaaaaaaaaa", sent_time : "14:25"}] }).save()

    const ToniGeorgina = await new chatModel({ content: [{from_number : Toni._id, to_number : Georgina._id, message_text : "ZDR. Georginaaaaaaaaa", sent_time : "14:25"}] }).save()


    await userModel.findByIdAndUpdate(Susi._id, { $push: {
        contactsList : { $each : [Ingar, Lexy, Audie, Pam]}
    }});


    await userModel.findByIdAndUpdate(Pam._id, { $push: {
        contactsList : { $each : [Susi, Ingar, Lexy, Audie]}
    }});


    await userModel.findByIdAndUpdate(Ingar._id, { $push: {
        contactsList : { $each : [Susi, Pam, Lexy, Audie]}
    }});


    await userModel.findByIdAndUpdate(Lexy._id, { $push: {
        contactsList : { $each : [Susi, Pam, Ingar, Audie]}
    }});



    await userModel.findByIdAndUpdate(Audie._id, { $push: {
        contactsList : { $each : [Susi, Pam, Ingar, Lexy]}
    }});




    await userModel.findByIdAndUpdate(Georgi._id, { $push: {
        contactsList : { $each : [Ivan, Petkan, Toni, Georgina]}
    }});


    await userModel.findByIdAndUpdate(Ivan._id, { $push: {
        contactsList : { $each : [Georgi, Petkan, Toni, Georgina]}
    }});


    await userModel.findByIdAndUpdate(Petkan._id, { $push: {
        contactsList : { $each: [Georgi, Ivan, Georgina]}
    }});


    await userModel.findByIdAndUpdate(Toni._id, { $push: {
        contactsList : {$each : [Georgi, Ivan, Georgina]} 
        }});


    await userModel.findByIdAndUpdate(Georgina._id, { $push: {
        contactsList : {$each : [Georgi, Ivan, Petkan, Toni]}
        }});
        

    console.log('db ready')
}