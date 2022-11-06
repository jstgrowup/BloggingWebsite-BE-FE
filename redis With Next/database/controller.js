import UserModel from "./testmodel";

export async function getUsers(req, res) {
    try {
        const users = await UserModel.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
   
}

export async function postUsers(req, res) {
    const { name, email, gender } = req.body
    try {
        const users = await UserModel.create({ name: name, email: email, gender: gender })
        res.send(users)
    } catch (error) {
        res.status(404).json({
            message: "No users found"
        })
    }
}