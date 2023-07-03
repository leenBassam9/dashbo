import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getmyprofile",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const userData = response.data.data[0];
        setUserData(userData);
        setNewName(userData.user_name);
        setAvatar(userData.user_image);
      } catch (error) {
        console.error(error);
      }
    };

    if (jwtToken) {
      fetchUserProfile();
    }
  }, [jwtToken]);

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    setAvatar(URL.createObjectURL(selectedFile));
    setImage(selectedFile);
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
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        };
        const response = axios.post(
          "http://127.0.0.1:8000/api/updateUserProfile",
          updateData,
          config
        );
        console.log(response.data);
      }

      // Upload profile picture
      if (avatar) {
        const formData = new FormData();
        formData.append("image", image);
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        };
        console.log(formData);
        const imageResponse = await axios.post(
          "http://127.0.0.1:8000/api/updateProfileImage",
          formData,
          config
        );
        console.log(imageResponse.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePasswordChange = (e) => {
    if (updateName) {
      return;
    }
    setNewPassword(e.target.value);
    setUpdatePassword(true);
  };

  return (
    <Box p={"50px"} component="form" onSubmit={handleSubmit}>
      {userData && (
        <Box>
          <Typography variant="h2">Edit Profile</Typography>

          <div>
            <label htmlFor="avatar-upload">
              <img
                src={avatar}
                alt="Avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
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
      )}
    </Box>
  );
};

export default Profile;
