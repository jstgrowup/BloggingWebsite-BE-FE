
import connectmongo from "../../database/conn";
import redis from "ioredis"
import nc from "next-connect"
import UserModel from "../../database/testmodel";
const clientredis = new redis()
const app = nc()
connectmongo()
app.get(async (req, res) => {
  let data = await clientredis.get("discuss")
  if (data) {
    data = JSON.parse(data)
    res.send(data)
  }
  else {
    try {
      const test = await UserModel.find()
      await clientredis.set("discuss", JSON.stringify(test))
      res.send(test)

    } catch (error) {
      res.status(401).send({ messege: error.messege })
    }
  }
 
})
app.post(async (req, res) => {
  const { name, email, gender } = req.body
  try {
    const user = await UserModel.create({ name: name, email: email, gender: gender })
    res.send(user)
  } catch (error) {
    res.status(401).send({ mssg: error.message })
  }
})
// export default async function handler(req, res) {



//   // let data = await clientredis.get("discuss")
//   // if (data) {

//   //   data = JSON.parse(data)
//   //   res.send(data)
//   // }
//   // else {
//   // const test = await Test.find()
//   // await clientredis.set("discuss", JSON.stringify(test))
//   // res.send(test)
//   // }
// }
export default app