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
import axios from "axios";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "../login/login.css";
const LoginComponent = () => {
  const [values, setValues] = useState({
    email: "",
    passwrd: "",
    showPassword: false,
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users", {
        email: values.email,
        passwrd: values.passwrd,
      })
      .then((res) => console.log(res));
  };
  
  // console.log(values);
  const handlePassVisibility = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <Container maxWidth="sm" className="GridStyle">
      <Paper className="PaperStyle" elevation={4}>
        <Grid align="center">
          <Avatar className="AvatarStyle">
            <LockOutlinedIcon />
          </Avatar>
          <h1>Log In</h1>
        </Grid>

        <form onSubmit={handelSubmit}>
          <TextField
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="TextFiledStyle"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon className="StartIcons" />
                </InputAdornment>
              ),
            }}
            variant="standard"
            placeholder="Email Adress"
            type="email"
          />

          <TextField
            onChange={(e) => setValues({ ...values, passwrd: e.target.value })}
            className="TextFiledStyle"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon className="StartIcons" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className="EndIcons"
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

          <Button fullWidth variant="outlined" type="submit">
            Sign in
          </Button>
        </form>
        <Typography align="center">
          <Link href="@" variant="body2">
            Forget Paswword?
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginComponent;
