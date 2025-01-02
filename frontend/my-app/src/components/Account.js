/*

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.account.username || "",
    email: user?.account.email || "",
    phone: user?.account.phone || "",
    profilePic: user?.account.profilePic || "", // Assuming profilePic is a URL
  });
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedData = { ...formData };

    if (newProfilePic) {
      const formDataObj = new FormData();
      formDataObj.append("file", newProfilePic);

      // Example: Save the profile picture to your server
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataObj,
        });
        const data = await response.json();
        updatedData.profilePic = data.url; // Assuming server returns the uploaded image URL
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    // Example: Save user data to the server
    console.log("Updated data to save:", updatedData);

    setFormData(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      username: user?.account.username || "",
      email: user?.account.email || "",
      phone: user?.account.phone || "",
      profilePic: user?.account.profilePic || "",
    });
    setNewProfilePic(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Account</h2>
      {user && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {newProfilePic && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={URL.createObjectURL(newProfilePic)}
                      alt="New Profile Preview"
                      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    />
                  </div>
                )}
              </>
            ) : (
              <img
                src={formData.profilePic || "/default-profile.png"}
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Username: </strong>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            ) : (
              formData.username
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Email: </strong>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              formData.email
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Phone: </strong>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              formData.phone
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {isEditing ? (
          <>
            <button onClick={handleSave} style={{ marginRight: "10px" }}>
              Save
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
}
*/

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function Account() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.account.username || "",
    email: user?.account.email || "",
    phone: user?.account.phone || "",
    profilePic: user?.account.profilePic || "", // Assuming profilePic is a URL
  });
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedData = { ...formData };

    if (newProfilePic) {
      const formDataObj = new FormData();
      formDataObj.append("file", newProfilePic);

      // Example: Save the profile picture to your server
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataObj,
        });
        const data = await response.json();
        updatedData.profilePic = data.url; // Assuming server returns the uploaded image URL
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    // Example: Save user data to the server
    console.log("Updated data to save:", updatedData);

    setFormData(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      username: user?.account.username || "",
      email: user?.account.email || "",
      phone: user?.account.phone || "",
      profilePic: user?.account.profilePic || "",
    });
    setNewProfilePic(null);
    setIsEditing(false);
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "50px" }}>
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Account
          </Typography>

          {user && (
            <>
              <Box display="flex" justifyContent="center" marginBottom={2}>
                <Avatar
                  src={
                    newProfilePic
                      ? URL.createObjectURL(newProfilePic)
                      : formData.profilePic || "/default-profile.png"
                  }
                  alt="Profile"
                  sx={{ width: 100, height: 100 }}
                />
                {isEditing && (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <PhotoCamera />
                  </IconButton>
                )}
              </Box>

              <Box>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Box>
            </>
          )}
        </CardContent>

        <CardActions>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ marginRight: 1 }}
              >
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
