import React, { useEffect } from 'react'
import axios from "axios"
import {
  Box,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [tokens, settokens] = useState({})
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleSubmit = () => {

    axios.post("http://localhost:8080/signup", values)
      .then((res) => {
        const { Maintoken, refreshtoken } = res.data
        settokens({ Maintoken: Maintoken, refreshtoken: refreshtoken })
        alert("thanks for sign up")

      })
      .catch((er) => alert(er.message))

  };
  useEffect(() => {
    localStorage.setItem("tokens", JSON.stringify(tokens))

  }, [tokens])

  const handleGoogle = () => {
    window.open("http://localhost:8080/auth/google", "_self")
  }
  return (
    <Flex direction={"column"} align={"center"}>

      <a href={"https://github.com/login/oauth/authorize?client_id=1834c6bdabab29c179ae"}>Signup with github</a>

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
            placeholder="name"
            type="text"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />
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
          <Button onClick={handleGoogle}>google auth</Button>
        </Flex>
      </Box>
    </Flex>
  );
}
export default Signup


