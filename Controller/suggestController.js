require('dotenv').config()
const suggest = require('../models/todaysuggest');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const Secret_Key = process.env.Secret_Key;

module.exports.AddColor= async (req, res) =>{
    try{
        const {color} = req.body;
        if (!color) {
            return res.status(404).json({ Message: "Enter your color" })
          }
          const token = req.headers.authorization;
          const decodedToken = jwt.verify(token, Secret_Key);
          const user = await User.findById(decodedToken.userId)

          const newSuggest = new suggest({
            color,
            user:user._id,
          })
          await newSuggest.save();
          return res.status(201).json({ Message: "color saved successfully" })

    }
    catch (error) {
        return res.status(500).json({ Message: "Internal server error" })
      }
}

module.exports.getColor = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, Secret_Key);
    const Currentuser = await User.findById(decodedToken.userId)
    const suggestDatas = await suggest.find({ user: Currentuser._id });
    if (suggestDatas) {
      return res.status(201).json(suggestDatas)
    } else {
      return res.status(404).json({ Message: "Data not found/color history not created" })
    }

  }
  catch (err) {
    return res.status(500).json({ Message: "Internal server error", err })
  }
}