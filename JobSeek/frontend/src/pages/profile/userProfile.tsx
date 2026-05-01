import React, { useState } from "react";
import {
Box,
Typography,
Button,
TextField,
InputAdornment,
Card,
CardContent,
Avatar,
Divider,
Chip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAuth } from "../../hooks/useAuth";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

const UserProfile: React.FC = () => {
const { user } = useAuth();
const { updateProfile, loading } = useUpdateProfile();

const [editing, setEditing] = useState(false);
const [newName, setNewName] = useState(user?.name || "");
const [newEmail, setNewEmail] = useState(user?.email || "");

const memberSince =
user?.createdAt &&
new Date(user.createdAt).toLocaleDateString("en-GB");

const handleSave = async () => {
  try {
    await updateProfile({
      name: newName,
      email: newEmail
  });
    setEditing(false);
  } catch (error) {
    console.error("Profile update failed", error);
  }

};

return (
  <Box sx={{ p: 5, maxWidth: 1100 }}>
    <Typography variant="h4" sx={{ fontWeight: 600 }}>
    My Profile

    </Typography>

      <Typography sx={{ fontWeight: "light", mb: 2 }}>
        Manage your account information and preferences
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Personal Information
            </Typography>

            {!editing && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 4 }}>
            <TextField
              label="Full Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
                readOnly: !editing
              }}
            />

            <TextField
              label="Email Address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
                readOnly: !editing
              }}
            />

            <TextField
              label="Role"
              value="Job Seeker"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
                readOnly: true
              }}
            />

            <TextField
              label="Member Since"
              value={memberSince || ""}
              sx={{ width: 300 }}
              InputProps={{
                readOnly: true
              }}
            />
          </Box>

          {editing && (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
              >
                Save Changes
              </Button>

              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card sx={{ textAlign: "center", p: 3, mt: 2 }}>
        <CardContent>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 120,
              height: 120,
              fontSize: 48,
              mx: "auto",
              mb: 2
            }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            {user?.name?.toUpperCase()}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {user?.email}
          </Typography>
            {user?.role === "JOBSEEKER" ? <Chip
            label="Job Seeker"
            color="primary"
            sx={{ fontSize: 16, px: 2, py: 2, borderRadius: 2 }}
          />:
          <Chip
            label="Recruiter"
            color="primary"
            sx={{ fontSize: 16, px: 2, py: 2, borderRadius: 2 }}
          />

  }
          <Divider sx={{ my: 4 }} />

          <Typography color="text.secondary">
            Member Since {memberSince}
          </Typography>
        </CardContent>
      </Card>

      {user?.role === "JOBSEEKER" && (
        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
          Manage Resumes
        </Button>
      )}
  </Box>

  );
};

export default UserProfile;