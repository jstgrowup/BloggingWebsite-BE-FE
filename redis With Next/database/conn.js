const MONGODB_URI = "mongodb+srv://subham:4321@cluster0.44fea50.mongodb.net/testingdatabase"
import  mongoose from "mongoose"
const connectmongo = async () => {
   await mongoose.connect(MONGODB_URI)
    console.log("database connected");
}
export default connectmongo

