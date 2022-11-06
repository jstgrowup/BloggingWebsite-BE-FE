
import connectmongo from "../../database/conn";

import nc from "next-connect"
import UserModel from "../../database/testmodel";

const app = nc()
connectmongo()
app.get(async (req, res) => {
    const { id } = req.query

    try {
        const test = await UserModel.findById(id)

        res.send(test)

    } catch (error) {
        res.status(401).send({ messege: error.messege })
    }


})
app.delete(async (req, res) => {
    const { id } = req.query

    try {
        const test = await UserModel.findByIdAndDelete(id)

        res.send(test)

    } catch (error) {
        res.status(401).send({ messege: error.messege })
    }


})
app.patch(async (req, res) => {
    const { id } = req.query
    try {
        const m = await Movie.findByIdAndUpdate(id, { ...req.body }, { new: true })
        res.status(200).send(m)
    } catch (error) {
        res.status(401).send({ mssg: error.message })
    }
})
export default app