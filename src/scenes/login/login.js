import React, { useState } from "react";
import {
  Link,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  InputAdornment,
  TextField,
  Avatar,
  Container,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    token: "",
    showPassword: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setError("");

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Email or password is incorrect");
        }
        return res.json();
      })
      .then((data) => {
        // Store the JWT token in the user's browser
        localStorage.setItem("jwtToken", data.authorisation.token);

        // Redirect the user to the home page or dashboard
        window.location.href = "/";
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handlePassVisibility = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={4}
        style={{
          padding: "2rem",
          width: "50%",
          maxWidth: "600px",
        }}
      >
        <Grid align="center">
          <Avatar
            style={{
              margin: "1rem",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <h1>Log In</h1>
        </Grid>

        <form onSubmit={handleSubmit}>
          {error && (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          )}

          <TextField
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            style={{ margin: "0.8rem 0" }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon style={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
            variant="standard"
            placeholder="Email Adress"
            type="email"
          />

          <TextField
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            style={{ margin: "0.8rem 0" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon style={{ color: "#999" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ color: "#999" }}
                  aria-label="toggle-password"
                  edge="end"
                >
                  <IconButton onClick={handlePassVisibility}>
                    {values.showPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            variant="standard"
            placeholder="Password"
            type={values.showPassword ? "text" : "password"}
          />

          <Button
            fullWidth
            variant="outlined"
            type="submit"
            style={{ color: "#999" }}
          >
            Log-in
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginComponent;
