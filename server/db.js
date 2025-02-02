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
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam",
  sent_time: "7:45"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "at velit eu est congue elementum in hac habitasse platea dictumst",
  sent_time: "8:50"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit",
  sent_time: "2:57"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla",
  sent_time: "6:59"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc",
  sent_time: "8:25"
}, {
  from_number: Susi._id,
  to_number: Ingar._id,
  message_text: "id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at",
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
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "vestibulum sit amet cursus id turpis integer aliquet massa id lobortis",
    sent_time: "8:09"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue",
    sent_time: "21:27"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean",
    sent_time: "10:29"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac",
    sent_time: "21:33"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "vestibulum quam sapien varius ut blandit non interdum in ante vestibulum",
    sent_time: "23:17"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea",
    sent_time: "10:11"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat",
    sent_time: "16:44"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra",
    sent_time: "15:24"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non",
    sent_time: "19:02"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim",
    sent_time: "17:19"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "in congue etiam justo etiam pretium iaculis justo in hac habitasse",
    sent_time: "13:57"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus",
    sent_time: "20:40"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo",
    sent_time: "13:11"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum",
    sent_time: "21:21"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc",
    sent_time: "3:54"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in",
    sent_time: "18:06"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor",
    sent_time: "17:57"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam",
    sent_time: "17:33"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in",
    sent_time: "10:23"
  }, {
    from_number: Lexy._id,
    to_number: Susi._id,
    message_text: "vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere",
    sent_time: "0:08"
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
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus",
    sent_time: "5:06"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed",
    sent_time: "8:43"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "convallis nunc proin at turpis a pede posuere nonummy integer non velit",
    sent_time: "1:01"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor",
    sent_time: "21:26"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin",
    sent_time: "5:55"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus",
    sent_time: "5:27"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum",
    sent_time: "13:10"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "interdum mauris ullamcorper purus sit amet nulla quisque arcu libero",
    sent_time: "14:55"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut",
    sent_time: "11:05"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "erat volutpat in congue etiam justo etiam pretium iaculis justo in hac",
    sent_time: "21:57"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget",
    sent_time: "1:49"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu",
    sent_time: "7:01"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices",
    sent_time: "13:55"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt",
    sent_time: "18:05"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra",
    sent_time: "23:08"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices",
    sent_time: "5:37"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac",
    sent_time: "17:27"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
    sent_time: "20:48"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem",
    sent_time: "22:49"
  }, {
    from_number: Audie._id,
    to_number: Susi._id,
    message_text: "morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus",
    sent_time: "16:45"
  }] }).save()

// const SusiIngar = await new chatModel({ content: [{}] }).save()


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
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu",
    sent_time: "22:20"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "rutrum rutrum neque aenean auctor gravida sem praesent id massa",
    sent_time: "3:45"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in",
    sent_time: "16:56"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut",
    sent_time: "4:31"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in",
    sent_time: "0:10"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna",
    sent_time: "7:02"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi",
    sent_time: "21:29"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id",
    sent_time: "23:16"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum",
    sent_time: "3:57"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean",
    sent_time: "17:01"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed",
    sent_time: "14:41"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla",
    sent_time: "13:41"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at",
    sent_time: "7:13"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium",
    sent_time: "14:10"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi",
    sent_time: "2:02"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor",
    sent_time: "18:34"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque",
    sent_time: "10:49"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus",
    sent_time: "21:25"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse",
    sent_time: "23:30"
  }, {
    from_number: Pam._id,
    to_number: Ingar._id,
    message_text: "condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit",
    sent_time: "17:04"
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
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis",
        sent_time: "3:26"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum",
        sent_time: "1:57"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh",
        sent_time: "2:45"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "erat id mauris vulputate elementum nullam varius nulla facilisi cras non",
        sent_time: "20:49"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla",
        sent_time: "12:16"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "eu sapien cursus vestibulum proin eu mi nulla ac enim in",
        sent_time: "12:56"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae",
        sent_time: "0:52"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "leo odio porttitor id consequat in consequat ut nulla sed accumsan felis",
        sent_time: "19:31"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer",
        sent_time: "3:22"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus",
        sent_time: "1:32"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend",
        sent_time: "5:08"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor",
        sent_time: "18:01"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris",
        sent_time: "1:54"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis",
        sent_time: "8:27"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat",
        sent_time: "13:43"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet",
        sent_time: "4:04"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero",
        sent_time: "1:34"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec",
        sent_time: "2:58"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel",
        sent_time: "14:55"
      }, {
        from_number: Pam._id,
        to_number: Lexy._id,
        message_text: "nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede",
        sent_time: "4:01"
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
      }, {
        from_number: Audie._id,
        to_number: Pam._id,
        message_text: "iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales",
        sent_time: "10:10"
      }, {
        from_number: Audie._id,
        to_number: Pam._id,
        message_text: "nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum",
        sent_time: "2:12"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo",
        sent_time: "22:39"
      }, {
        from_number: Audie._id,
        to_number: Pam._id,
        message_text: "pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo",
        sent_time: "13:35"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi",
        sent_time: "16:51"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam",
        sent_time: "13:49"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut",
        sent_time: "9:21"
      }, {
        from_number: Audie._id,
        to_number: Pam._id,
        message_text: "rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id",
        sent_time: "9:49"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "felis fusce posuere felis sed lacus morbi sem mauris laoreet",
        sent_time: "18:12"
      }, {
        from_number: Audie._id,
        to_number: Pam._id,
        message_text: "curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in",
        sent_time: "1:31"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla",
        sent_time: "6:50"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec",
        sent_time: "15:33"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et",
        sent_time: "12:52"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget",
        sent_time: "16:43"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in",
        sent_time: "6:28"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio",
        sent_time: "21:13"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci",
        sent_time: "13:40"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed",
        sent_time: "6:00"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui",
        sent_time: "19:37"
      }, {
        from_number: Pam._id,
        to_number: Audie._id,
        message_text: "dapibus dolor vel est donec odio justo sollicitudin ut suscipit",
        sent_time: "19:23"
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
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean",
        sent_time: "18:23"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "vulputate elementum nullam varius nulla facilisi cras non velit nec nisi",
        sent_time: "14:32"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at",
        sent_time: "16:37"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae",
        sent_time: "9:10"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "sit amet eleifend pede libero quis orci nullam molestie nibh in lectus",
        sent_time: "21:14"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt",
        sent_time: "2:04"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit",
        sent_time: "4:53"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium",
        sent_time: "19:52"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti",
        sent_time: "10:56"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor",
        sent_time: "18:16"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum",
        sent_time: "16:02"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac",
        sent_time: "23:45"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate",
        sent_time: "19:44"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet",
        sent_time: "23:34"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia",
        sent_time: "18:15"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer",
        sent_time: "14:05"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci",
        sent_time: "4:49"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "enim in tempor turpis nec euismod scelerisque quam turpis adipiscing",
        sent_time: "5:16"
      }, {
        from_number: Ingar._id,
        to_number: Lexy._id,
        message_text: "eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien",
        sent_time: "23:21"
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
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "semper sapien a libero nam dui proin leo odio porttitor id consequat in",
        sent_time: "10:13"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "morbi quis tortor id nulla ultrices aliquet maecenas leo odio",
        sent_time: "7:00"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst",
        sent_time: "4:45"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "hac habitasse platea dictumst maecenas ut massa quis augue luctus",
        sent_time: "22:17"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget",
        sent_time: "2:14"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis",
        sent_time: "8:20"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in",
        sent_time: "11:05"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque",
        sent_time: "8:47"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu",
        sent_time: "5:57"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "semper rutrum nulla nunc purus phasellus in felis donec semper sapien a",
        sent_time: "12:01"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "tellus nulla ut erat id mauris vulputate elementum nullam varius nulla",
        sent_time: "8:52"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "sem duis aliquam convallis nunc proin at turpis a pede posuere",
        sent_time: "20:01"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede",
        sent_time: "16:50"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis",
        sent_time: "9:22"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam",
        sent_time: "23:47"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris",
        sent_time: "21:02"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer",
        sent_time: "16:25"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum",
        sent_time: "20:44"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea",
        sent_time: "7:04"
      }, {
        from_number: Audie._id,
        to_number: Ingar._id,
        message_text: "hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam",
        sent_time: "19:42"
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
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "nunc purus phasellus in felis donec semper sapien a libero",
        sent_time: "18:41"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus",
        sent_time: "21:28"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a",
        sent_time: "3:42"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh",
        sent_time: "5:06"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "dui luctus rutrum nulla tellus in sagittis dui vel nisl duis",
        sent_time: "13:23"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse",
        sent_time: "12:34"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam",
        sent_time: "2:52"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor",
        sent_time: "11:54"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum",
        sent_time: "2:18"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac",
        sent_time: "23:58"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse",
        sent_time: "18:01"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum",
        sent_time: "2:27"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac",
        sent_time: "18:58"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec",
        sent_time: "8:51"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim",
        sent_time: "22:18"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo",
        sent_time: "0:29"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis",
        sent_time: "11:05"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing",
        sent_time: "12:38"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a",
        sent_time: "16:39"
      }, {
        from_number: Audie._id,
        to_number: Lexy._id,
        message_text: "vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien",
        sent_time: "5:57"
      }] }).save()


   const Dorri = await new userModel({name:"Dorri",phoneNumber:"9222852680",avatar:"https://robohash.org/sintexdistinctio.png?size=50x50&set=set1"}).save()
   const Godard = await new userModel({name:"Godard",phoneNumber:"6142553014",avatar:"https://robohash.org/modiporroasperiores.png?size=50x50&set=set1"}).save()
   const Amelia = await new userModel({name:"Amelia",phoneNumber:"7362052283",avatar:"https://robohash.org/dolorreiciendispraesentium.png?size=50x50&set=set1"}).save()
   const Carlyn = await new userModel({name:"Carlyn",phoneNumber:"4698079371",avatar:"https://robohash.org/errorfacilishic.png?size=50x50&set=set1"}).save()
   const Kassie = await new userModel({name:"Kassie",phoneNumber:"3201046099",avatar:"https://robohash.org/earumexiure.png?size=50x50&set=set1"}).save()
   
   
  
   const Emelita = await new userModel({name:"Emelita",phoneNumber:"4931625576",avatar:"https://robohash.org/totamitaquedeleniti.png?size=50x50&set=set1"}).save()
   const Darin = await new userModel({name:"Darin",phoneNumber:"8533583593",avatar:"https://robohash.org/asperioressapientenostrum.png?size=50x50&set=set1"}).save()
   const Karlens = await new userModel({name:"Karlens",phoneNumber:"4936862833",avatar:"https://robohash.org/isteexplicaboeaque.png?size=50x50&set=set1"}).save()
   const Bryant = await new userModel({name:"Bryant",phoneNumber:"7942120520",avatar:"https://robohash.org/ipsaeligendidelectus.png?size=50x50&set=set1"}).save()
   const Parker = await new userModel({name:"Parker",phoneNumber:"9001844690",avatar:"https://robohash.org/inciduntetet.png?size=50x50&set=set1"}).save()
  



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