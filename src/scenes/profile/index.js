import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        " http://127.0.0.1:8000/api/updateUserProfile/{$id}",
        {
          name: name,
          password: password,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Box p={"80px"} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">Edit Profile</Typography>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileEdit;
