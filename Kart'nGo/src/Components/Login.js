import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../utils/authToken";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import APIs from "../constants";

// const LoginURL =
//   "https://ysb5fl162a.execute-api.us-east-1.amazonaws.com/prod/login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrormessage] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrormessage("Email and password are required");
      return;
    }
    setErrormessage(null);
    console.log("Login button is clicked");

    const user = {
      email: email,
      password: password,
    };
    console.log("API URL:", APIs.LOGIN);

    await axios
      .post(APIs.LOGIN, user)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);

        setMessage("Login Successful");

        console.log(email);
        navigate("/");
      })

      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setErrormessage(error.response.data.message);
        } else {
          setErrormessage(
            "User does not exist! Please enter correct email or Signup"
          );
        }

        console.log("Error while Login", error);
        console.error(error);
      });
  };

  return (
    <div>
      <form>
        <Navbar />
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "0px 5px 10px #ccc",
            },
          }}
        >
          <Typography
            variant="h3"
            padding={2}
            textAlign="center"
            sx={{ fontSize: 24, fontFamily: "cursive" }}
          >
            Login
          </Typography>
          {error && (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          )}
          <Typography
            variant="h6"
            padding={1}
            sx={{ fontSize: 16, fontFamily: "cursive" }}
            textAlign={"left"}
          >
            Email
          </Typography>
          <TextField
            type="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Typography
            variant="h6"
            sx={{ fontSize: 16, fontFamily: "cursive" }}
            padding={1}
            textAlign={"left"}
          >
            Enter Password
          </Typography>

          <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ borderRadius: 5 }}
            type="password"
            variant="outlined"
          />

          <Button
            onClick={handleLogin}
            marginTop={3}
            sx={{
              borderRadius: 10,
              paddingTop: 1.5,
              paddingBottom: 1.5,
              marginBottom: 2,
              marginLeft: 2,
              marginRight: 2,
              marginTop: 4,
              height: 40,
              backgroundColor: "black",
              textAlign: "center",
              fontSize: 14,
              fontFamily: "cursive",
            }}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
