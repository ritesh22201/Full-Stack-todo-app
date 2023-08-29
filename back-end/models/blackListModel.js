const mongoose  = require("mongoose")


const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
      }
})

const BlackListModel = mongoose.model("blacklist",blacklistSchema);

module.exports = BlackListModel;