import { Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

function Test() {
    const [data, setdata] = useState(0)
    const handletest = async () => {
        await axios.post('http://localhost:8080/test', {
            email: "hdgfjashdf@gmail.com",
            name: "hsdgfahgsd"
        }).then(res => console.log(res)).catch(er => console.log(er))
    }
    return (
        <div>
            <Button onClick={handletest}>dsfasdfasd</Button>
        </div>
    )
}

export default Test