import { Schema,  model } from "mongoose";
const schema = new Schema({
    id: Number,
    name: String,
    email: String,
    gender: String,

})
const Test = model("testingcollections")|| model("testingcollections", schema)
export default Test