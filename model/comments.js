const mongoose = require('mongoose')


const commentsSchema = new mongoose.Schema({
  blogid:{
    type:String
  },
//   likes:{
//     type:Number,
//     default:Number("0")
//   }
//   },
//   id:{
//     type:Number,
//     default: Number("12")
//   }
  comment:{
    type: String,
    
  }

})



module.exports = mongoose.model('Comments', commentsSchema)