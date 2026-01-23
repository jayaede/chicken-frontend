import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Typography, Box, Link, CircularProgress } from "@mui/material";
import api from "../services/api";
import Snackbar from "../components/common/Snackbar";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });

  const sendOtp = async () => {
    setLoading(true);
    try {
      let response = await api.post("/auth/forgot-password", { username });
      setLoading(false);
      if (response.data.success){
        navigate("/reset-password", {
          state: { username },
        });
      }
      setSnack({ open: true, msg: response.data.message, type: "success" });
    } catch (error) {
      setLoading(false);
      setSnack({ open: true, msg: error.response?.data?.message || "Error sending OTP", type: "error" });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h6">Forgot Password</Typography>

      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Link>
        <Button variant="contained" onClick={sendOtp} disabled={loading || !username}>
          Send OTP
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
