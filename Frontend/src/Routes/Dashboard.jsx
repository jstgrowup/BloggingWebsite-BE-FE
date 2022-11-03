import { Button, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
// import { sign, verify } from "jsonwebtoken"
const socket = io("http://localhost:8080")
function Dashboard() {
    const [comments, setcomments] = useState("")
    const [chat, setchat] = useState([])
    const [user, setuser] = useState({})
    const [allmesseges, setallmesseges] = useState([])

    const para = window.location.search
    // const { refreshtoken } = JSON.parse(localStorage.getItem("tokens"))


    // const user = verify(refreshtoken, "RefreshSecret")
    // console.log('para:', para.split("=")[1])

    const handleSubmit = async (e) => {
        e.preventDefault()
        socket.emit("comment", { comments })
        await axios.post("http://localhost:8080/postMesseges", { messege: comments }).then((res) => {
            
            console.log(comments);
        }).catch(er => alert(er.message))
        setcomments("")
    }
    useEffect(() => {
        axios.get("http://localhost:8080/getAllMesseges").then(res =>setallmesseges(res.data) ).catch(er => console.log(er))
        
        socket.on("comment", (comment) => {
            setchat([...chat, comment])
        })
        
    },[allmesseges])


    
    return (
        <div>
            <h1>Comments</h1>
            {
                allmesseges.map((el, i) => {
                    return (
                        <p key={i}>{el.comments}:
                        {/* <span>{user.name}</span>  */}
                        </p>
                    )
                })
            }
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='Comment' onChange={(e) => setcomments(e.target.value)}  />
                <input type="submit" value="Send " />
            </form>

        </div>
    )
}

export default Dashboard