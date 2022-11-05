const MONGO_URL = "mongodb+srv://subham:4321@cluster0.44fea50.mongodb.net/testingdatabase"
import mongoose from "mongoose"
const connectmongo = async () => {
    mongoose.connect(MONGO_URL)
    console.log("database connected");
}
export default connectmongo

