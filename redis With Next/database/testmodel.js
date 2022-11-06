import * as mongoose from "mongoose";
const TestingSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    gender: String,
})

const UserModel = mongoose.models.testingcollections || mongoose.model("testingcollections", TestingSchema)
export default UserModel