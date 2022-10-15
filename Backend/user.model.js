const { Schema, model } = require("mongoose")
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,

    // role: {
    //     type: String,
    //     enum: ["Admin", "writer", "User"]
    // },
    // verified: false

}, {
    versionKey: false
})

const userModel = model("users", userSchema)
module.exports = userModel