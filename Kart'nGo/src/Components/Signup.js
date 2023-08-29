import React, { useState } from "react";
import {   Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import APIs from "../constants";

// const signupURL =
//   "https://71iqjioice.execute-api.us-east-1.amazonaws.com/prod/signup";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isName, setIsName] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [error, setErrormessage] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setIsName(value.length > 2); // Example validation condition
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression pattern for password validation
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,18}$/;
    return pattern.test(password);
  };

  const handleSignUp =  async (event) => {
    event.preventDefault();
    if (name === "" || email === "" || password === "") {
      setErrormessage("Please fill in all required fields");
      console.log("Please fill in all required fields");
      return; // Prevent form submission
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

     await axios
      .post(APIs.SIGNUP, user)
      .then((response) => {
        setMessage("Signup Successful");

        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Error during signing up", error);
        }

        console.log("Error while signing up", error);
        console.error(error);
      });
  };
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Paper
          elevation={5}
          component={Box}
          padding={4}
          borderRadius={10}
          textAlign="center"
        >
          <Typography variant="h3" sx={{ fontFamily: "cursive" }}>
            Sign up
          </Typography>
          {error && (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          )}
          <TextField
            label="Username"
            value={name}
            onChange={handleNameChange}
            error={!isName}
            helperText={!isName ? "Username is required" : ""}
            margin="normal"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid}
            helperText={!isEmailValid ? "Invalid email format" : ""}
            margin="normal"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            label="Create Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!isPasswordValid}
            helperText={!isPasswordValid ? "Invalid password format" : ""}
            margin="normal"
            fullWidth
            variant="outlined"
            required
          />
          <Button
            onClick={handleSignUp}
            variant="contained"
            sx={{ borderRadius: 10, mt: 4, mb: 2, backgroundColor: "black" }}
          >
            Sign up
          </Button>
          <Typography variant="h5" sx={{ fontFamily: "cursive" }}>
            Or
          </Typography>
          <Grid container justifyContent="center">
            <Typography
              variant="h6"
              sx={{ fontSize: 20, ml: 2, fontFamily: "cursive" }}
            >
              Already have an account?{" "}
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              color="primary"
              variant="text"
              sx={{ borderRadius: 5, fontSize: 18, fontFamily: "cursive" }}
            >
              Login
            </Button>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;