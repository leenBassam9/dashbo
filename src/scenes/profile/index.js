import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newId, setNewId] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const userId = data.id; // Assuming the user ID is available in the response
        setNewId(userId);
      } catch (error) {
        console.error(error);
      }
    };

    if (jwtToken) {
      fetchUserId();
    }
  }, [jwtToken]);

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    setAvatar(URL.createObjectURL(selectedFile));
  };

  const handleNameChange = (e) => {
    if (updatePassword) {
      alert("You can only update one field at a time");
      return;
    }
    setNewName(e.target.value);
    setUpdateName(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {};
      if (newPassword !== "") {
        updateData.password = newPassword;
      }
      if (newName !== "") {
        updateData.name = newName;
      }

      // Update user profile information
      if (Object.keys(updateData).length > 0) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/updateUserProfile/${newId}`,
          updateData
        );
        console.log(response.data);
      }

      // Upload profile picture
      if (avatar) {
        const formData = new FormData();
        formData.append("profileImage", avatar);

        const imageResponse = await axios.post(
          `http://127.0.0.1:8000/api/updateProfileImage`,
          formData
        );
        console.log(imageResponse.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleIdChange = (e) => {
    setNewId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (updateName) {
      alert(
        "You can only update one field at a time, please refresh the page for new changes"
      );
      return;
    }
    setNewPassword(e.target.value);
    setUpdatePassword(true);
  };

  return (
    <Box p={"50px"} component="form" onSubmit={handleSubmit}>
      <Typography variant="h2">Edit Profile</Typography>

      <div>
        <label htmlFor="avatar-upload">
          <img
            src={avatar}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </label>
        <input
          accept="image/*"
          id="avatar-upload"
          type="file"
          onChange={handleAvatarChange}
          style={{ display: "none" }}
        />
      </div>

      <TextField
        label="Your ID"
        variant="outlined"
        margin="normal"
        fullWidth
        value={newId}
        onChange={handleIdChange}
      />
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={newName}
        onChange={handleNameChange}
      />

      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        value={newPassword}
        onChange={handlePasswordChange}
      />

      <Box display="flex" justifyContent="center">
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
