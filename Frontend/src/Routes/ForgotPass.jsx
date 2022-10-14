import { Button, Input } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'

function ForgotPass() {
    const [values, setValues] = useState({
        email: "",
        otp: "",
        password: ""

    });

    const handleOtp = () => {
        axios.post("http://localhost:8080/checkOtp", values).then((res) => {
            console.log(res);
        }).catch(e => console.log(e))
    }
    return (
        <>
      
            <Input placeholder='Enter your email' type={"number"} onChange={(e) => setValues((prev) => ({ ...prev, otp: e.target.value }))} />
            <Input placeholder='Enter your OTP' type={"number"} onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))} />
            <Input placeholder='Enter new password' type={"text"} onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} />

            <Button onClick={handleOtp}>Submit</Button>

        </>
    )
}

export default ForgotPass