const express = require("express")
const jswt = require("jsonwebtoken")
const app = express()
app.use(express.json())
const cors = require("cors")

app.use(cors())
require("./googleOauth")
const authRoute= require("./Auth")
const mongoose = require("mongoose")
const userModel = require("./user.model")
const { createTransport } = require("nodemailer")
const otpModel = require("./Otp.model")
const passport = require("passport")
require("dotenv").config()
const transport = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tania.rau99@ethereal.email',
        pass: 'k5FYdhBcGUZ6spw9Gc'
    }
})
const blacklist = []
app.get("/", (req, res) => {
    res.send("HOMEPGAE")
})
app.use("/auth",authRoute);

app.use(passport.initialize());
app.use(passport.session())


app.post("/signup", async (req, res) => {
    const { email, name, password } = req.body
    // const user = await userModel.create({ email: email, name: name, password: password, role: "User" })
    const user = await userModel.create({ email: email, name: name, password: password })

    const maintoken = jswt.sign({ id: user._id, password: user.password, email: user.email, name: user.name }, "MainSecret", { expiresIn: "10 min" })
    const refreshtoken = jswt.sign({ id: user._id, password: user.password, email: user.email, name: user.name }, "RefreshSecret", { expiresIn: "20 days" })
    transport.sendMail({
        to: user.email,
        from: "hello@gmail.com",
        subject: "hsagdshdgfhgsdjahgshdgf",
        text: "thanks for signup"
    }).then(() => {
        console.log("mail sent");
        res.send({ message: `signup success ${email} `, Maintoken: maintoken, refreshtoken: refreshtoken })
    })


})
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email, password })
    // const token = jswt.sign({ role: user.role }, "lecSecret", { expiresIn: "5 min" })
    if (!user) return res.status(401)
    // else if (user.role === "student") res.send("you are a student")
    // else if (user.role === "instructor") res.send("you are student")
    // else if (user.role === "admin") res.send("you are admin")
    res.send({ message: "login success" })
})
// app.post("/createLecture", (req, res) => {
//     const token = req.headers.authorization
//     const { title, zoomlink } = req.body

//     const user = jswt.decode(token)
//     if (decode.role === "instructor") res.send("lecture created")
//     else res.send("you are not allowed")

// })
app.post("/forgotPass", async (req, res) => {
    var { email } = req.body
    var otp = Math.floor(Math.random() * 100000)
    transport.sendMail({
        to: email,
        from: "hello@gmail.com",
        subject: "Forgot Passowrd",
        text: `hello ${email} your OTP is ${otp}`
    }).then(() => {
        
        const otpvar = otpModel.create({ email: email, otp: otp })

        res.send("otp sent")
    }).catch((e) => res.status(401).send("invalid request"))

})
app.post("/checkOtp", async (req, res) => {
    var { otp, email, password } = req.body
    const tok = await otpModel.find({ otp: otp, email: email })
    // console.log(tok);
    if (tok.length === 0) res.status(401).send("invalid")
    else {

        const huru = await userModel.findOneAndUpdate({ email: email }, { $set: { password: password } })
        res.send(huru)
    }


})
// app.post("/googleOauth",async (req,res)=>{

// })
app.post("/refresh", async (req, res) => {
    const refreshToken = req.headers.authorization
    try {
        const data = jswt.verify(refreshToken, "RefreshSecret")
        const maintoken = jswt.sign(data, "MainSecret", { expiresIn: "10min" })
        return res.send({ token: maintoken })
    } catch (error) {

        return res.send("refresh token invalid")
    }
})
app.get("/private", async (req, res) => {

    const token = req.headers["authorization"]
    if (blacklist.includes(token)) {
        return res.send(401)
    }
    if (!token) {
        return res.status(401).send("unauthorized")
    }
    try {
        jswt.verify(token, "MainSecret")
        res.send({ direction: "okay" })
    } catch (error) {
        if (error.messege === "jwt expired") {
            blacklist.push(refreshToken)

        }

    }
})
app.listen(8080, async () => {
    await mongoose.connect(
        "mongodb+srv://subham:4321@cluster0.1pwqesk.mongodb.net/nem201b20"
    );

    console.log("server started");
});

