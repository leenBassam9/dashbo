import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  InputAdornment,
  TextField,
  Avatar,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import "../login/login.css"; // import the CSS file
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          // Store the JWT token in the user's browser
          localStorage.setItem("jwtToken", response.data.authorisation.token);

          // Redirect the user to the home page or dashboard
          window.location.href = "/";
        } else {
          throw new Error("Email or password is incorrect");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handlePassVisibility = () => {
    setValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }));
  };

  return (
    <Grid justifyContent="center" alignItems="center" container>
      <Paper
        elevation={4}
        className="login-paper"
        style={{ background: "grey", padding: "2rem" }}
      >
        <Grid align="center">
          <Avatar
            style={{
              margin: "1rem",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h1" style={{ color: "white" }}>
            Log In
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          {error && (
            <Typography
              variant="body1"
              color="error"
              align="center"
              style={{ color: "white" }}
            >
              {error}
            </Typography>
          )}

          <TextField
            onChange={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                email: e.target.value,
              }))
            }
            style={{ margin: "0.8rem 0" }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
            variant="standard"
            placeholder="Email Address"
            type="email"
            inputProps={{ style: { color: "white" } }}
          />

          <TextField
            onChange={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                password: e.target.value,
              }))
            }
            style={{ margin: "0.8rem 0", width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="start"
                  style={{ color: "#999" }}
                  aria-label="toggle-password"
                  edge="end"
                >
                  <IconButton onClick={handlePassVisibility}>
                    {values.showPassword ? (
                      <VisibilityIcon style={{ color: "white" }} />
                    ) : (
                      <VisibilityOffIcon style={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            variant="standard"
            placeholder="Password"
            type={values.showPassword ? "text" : "password"}
            inputProps={{ style: { color: "white" } }}
          />

          <Button
            fullWidth
            variant="outlined"
            type="submit"
            style={{
              color: "#999",
              marginTop: "1rem",
              borderColor: "white",
              color: "white",
            }}
          >
            Log-in
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
