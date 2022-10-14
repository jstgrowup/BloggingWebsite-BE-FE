const { Schema, model } = require("mongoose")
const otpSchema = new Schema({
    email: String,
    otp: String
})
const otpModel = model("otps", otpSchema)
module.exports = otpModel