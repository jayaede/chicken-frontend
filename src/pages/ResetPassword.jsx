import { useState } from "react";
import { Paper, TextField, Button, Typography, Link, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import Snackbar from "../components/common/Snackbar";
export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;
  const [form, setForm] = useState({
    username: username || "",
    otp: "",
    password: "",
  });
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });

  const handleReset = async () => {
    try {
      let res = await api.post("/auth/reset-password", {
        username: form.username,
        otp: form.otp,
        newPassword: form.password,
      });
      setSnack({ open: true, msg: "Password reset successful", type: "success" });
      if (res.data.success) {
        alert("Password reset successful");
        navigate("/login");
      }
    } catch (error) {
      setSnack({ open: true, msg: error.response?.data?.message || "Reset failed", type: "error" });
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h6">Reset Password</Typography>

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={form.username}
        disabled
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <TextField
        label="OTP"
        fullWidth
        margin="normal"
        onChange={(e) => setForm({ ...form, otp: e.target.value })}
      />

      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Link>
        <Button 
          variant="contained" 
          onClick={handleReset}
          disabled={!form.otp || !form.password || !form.username}
        >
          Reset Password
        </Button>
      </Box>
      <Snackbar
        open={snack.open}
        message={snack.msg}
        severity={snack.type}
      />
    </Paper>
  );
}
