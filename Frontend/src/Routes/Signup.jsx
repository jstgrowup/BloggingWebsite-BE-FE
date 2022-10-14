// github
// const Client_ID = "1834c6bdabab29c179ae"
// const client_secret = "ea5424056e85c791ea32e5df158d61b724ab7526"
// goolge
//client ID=454887778237-pno12viu7pv4pse14b6n3ng8mi2dji0m.apps.googleusercontent.com
// client secret=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
// import  {Strategy} from 'passport-google-oauth20'
// const GoogleStrategy = Strategy
import React from 'react'
import axios from "axios"
import {
  Box,
  Button,
  Flex,
  Input,

  Text,

} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
// import passport from "passport";

// passport.use(new Strategy({
//   clientID: "454887778237 - pno12viu7pv4pse14b6n3ng8mi2dji0m.apps.googleusercontent.com",
//   clientSecret: "GOCSPX - VSWBQYzDu3CU74rVRX6lSp - XlyXo",
//   callbackURL: "http://localhost:3000/dashboard"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     console.log(profile);
//   }

// ));




function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = () => {

    axios.post("http://localhost:8080/signup", values)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.log(er))

  };
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

          <Text color={"#25CF60"}>Forgot Password?</Text>

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
  );
}

export default Signup


