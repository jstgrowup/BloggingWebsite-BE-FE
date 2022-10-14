import React, { useState } from 'react'
import axios from "axios"
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,

    Text,

} from "@chakra-ui/react";
function Loginform() {
    const [showPassword, setShowPassword] = useState(false);



    const [values, setValues] = useState({
        email: "",
        password: "",

    });

    const handleSubmit = () => {

        axios.post("http://localhost:8080/login", values)
            .then((res) => console.log(res))
            .catch((er) => console.log(er))

    };
    const handleForgotPassword = () => {
        if (!values.email) alert("please enter email")
        axios.post("http://localhost:8080/forgotPass", values.email)
    }
    return (
        <Flex direction={"column"} align={"center"}>

            <Box
                w={["300", "420px", "390px", "476px"]}

                boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
                borderRadius={"3xl"}
                mt={"5px"}
            >
                <Flex
                    direction={"column"}
                    align="center"
                    justify={"center"}
                    p={["4", "7", "10", "10"]}
                    gap={"4"}
                >


                    <Input
                        minW={"90%"}
                        p={"10"}
                        placeholder="Email"
                        type="email"
                        onChange={(e) =>
                            setValues((prev) => ({ ...prev, email: e.target.value }))
                        }
                    />

                    <Input
                        minW={"90%"}
                        p={"10"}
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        onChange={(e) =>
                            setValues((prev) => ({ ...prev, password: e.target.value }))
                        }
                    />

                    <Text color={"#25CF60"} onClick={handleForgotPassword}>Forgot Password?</Text>

                    <Button
                        onClick={handleSubmit}
                        color={"white"}
                        size={"lg"}
                        borderRadius={"3xl"}
                        bg={"#25CF60"}
                        _hover={{ bgColor: "#1da44c" }}
                    >
                        Sign up for free
                    </Button>

                </Flex>
            </Box>
        </Flex>
    )
}

export default Loginform