import Test from "../../database/testmodel";
import connectmongo from "../../database/conn";
import redis from "ioredis"
const clientredis = new redis()
export default async function handler(req, res) {
  // const { method } = req

  let data = await clientredis.get("discuss")
  if (data) {

    data = JSON.parse(data)
    res.send(data)
  }
  else {
    connectmongo()
    const test = await Test.find()
    await clientredis.set("discuss", JSON.stringify(test))
    res.send(test)
  }
}
