const mongoose = require("mongoose");

// defining todaySuggest schema
const todaySuggestSchema = new mongoose.Schema({
    color:{
        type:String
    },
    createdon: {
        type: String,
        default:String(new Date()).slice(4,15)    
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
    });
    // create a model
module.exports = mongoose.model("todaySuggest", todaySuggestSchema);