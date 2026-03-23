import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";
import axios from "../../services/api";
import Snackbar from "../../components/common/Snackbar";
import AdminShopsTable from "./AdminShopsTable";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      setSnack({ open: true, msg: "Failed to load dashboard data", type: "error" });
    } finally {
      setLoading(false);
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
    <Box>
      <Typography variant="h5" mb={3}>
        Admin Dashboard
      </Typography>
      <AdminShopsTable shops={data} />
      <Snackbar
        open={snack.open}
        message={snack.msg}
        type={snack.type}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </Box>
  );
};

export default AdminDashboard;
