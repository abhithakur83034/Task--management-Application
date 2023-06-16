const mongoose = require("mongoose");

const testSchema =new mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  image:{
    type:String,
  
  },
  description:{
    type:String,
    require:true
  },
  date:{
    type:String,
    require:true
  },
  status:{
    type:String,
    require:true
  }
  
});
module.exports = mongoose.model('test',testSchema)




