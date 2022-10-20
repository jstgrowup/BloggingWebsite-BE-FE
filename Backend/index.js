
const express = require("express")
const jswt = require("jsonwebtoken")
const app = express()

app.use(express.json())
const httpserver = require("http").createServer(app)
const cors = require("cors")
app.use(cors())
const io = require("socket.io")(httpserver, {
    cors: {
        origin: "*"
    }
})
require("./googleOauth")
const authRoute = require("./Auth")
const mongoose = require("mongoose")
const userModel = require("./user.model")
const { createTransport } = require("nodemailer")
const otpModel = require("./Otp.model")
const passport = require("passport")
const commentsModel = require("./Messeges.model")
require("dotenv").config()
const transport = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'arch2@ethereal.email',
        pass: 'P273aAWymhrXAmnXCd'
    }
})
io.on("connection", (user) => {

    console.log("new user connected");
    user.on("comment", (payload) => {
        io.emit("comment", payload)
    })
    user.on("disconnected", () => {
        console.log("user disconnecteed");
    })
})
const blacklist = []
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.post("/signup", async (req, res) => {
    const { email, name, password } = req.body
    // const user = await userModel.create({ email: email, name: name, password: password, role: "User" })
    const user = await userModel.create({ email: email, name: name, password: password })

    transport.sendMail({
        to: user.email,
        from: "hello@gmail.com",
        subject: "hsagdshdgfhgsdjahgshdgf",
        text: "thanks for signup"
    }).then(() => {

        res.send({ message: `signup success ${email} ` })
    })


})
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email, password })
    // const token = jswt.sign({ role: user.role }, "lecSecret", { expiresIn: "5 min" })
    if (!user) return res.status(401)
    const maintoken = jswt.sign({ id: user._id, password: user.password, email: user.email, name: user.name }, "MainSecret", { expiresIn: "10 min" })
    const refreshtoken = jswt.sign({ id: user._id, password: user.password, email: user.email, name: user.name }, "RefreshSecret", { expiresIn: "2 days" })
    // else if (user.role === "student") res.send("you are a student")
    // else if (user.role === "instructor") res.send("you are student")
    // else if (user.role === "admin") res.send("you are admin")
    res.send({ Maintoken: maintoken, refreshtoken: refreshtoken })
})
app.post("/VerifyTokenforFE", (req, res) => {
    try {
        const { token } = req.body
        const user = jswt.verify(token, "RefreshSecret")
        res.send(user)

    } catch (error) {
        console.log(error);
        res.status(401).send("something wrong")
    }
})
// app.post("/createLecture", (req, res) => {
//     const token = req.headers.authorization
//     const { title, zoomlink } = req.body

//     const user = jswt.decode(token)
//     if (decode.role === "instructor") res.send("lecture created")
//     else res.send("you are not allowed")

// })
app.get("/getAllMesseges", async (req, res) => {
    const messeges = await commentsModel.find()
    res.send(messeges)
})
app.post("/forgotPass", async (req, res) => {

    const { email } = req.body
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
app.post("/test", async (req, res) => {
    const { email, name } = req.body


    console.log(email, name);
    res.send("user sent")

})
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

// app.use("/auth", authRoute);
// app.use(passport.initialize());
// app.use(passport.session())
httpserver.listen(8080, async () => {
    await mongoose.connect(
        "mongodb+srv://subham:4321@cluster0.1pwqesk.mongodb.net/nem201b20"
    );
    console.log("server started");
});