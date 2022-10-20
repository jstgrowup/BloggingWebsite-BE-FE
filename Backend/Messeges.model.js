const { model, Schema } = require("mongoose")
const commentsSchema = new Schema({
    comments: String
})
const commentsModel = model("comments", commentsSchema)
module.exports = commentsModel