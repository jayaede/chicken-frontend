import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Alert, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import axios from "../../services/api";

const Card = ({ title, value }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="subtitle2">{title}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Paper>
);

const ShopDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/shop/dashboard").then(res => {
      setData(res.data);
    });
    setLoading(false);
  }, []);

  if (!data) return null;
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" mb={3}>Shop Dashboard</Typography>
      {/* STATS */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card title="Today's Revenue" value={`₹ ${data.todaySales}`} />
        </Grid>
        <Grid item xs={4}>
          <Card title="Remaining Stock (KG)" value={data.currentStockKg} />
        </Grid>
      </Grid>

      {/* LOW STOCK ALERT */}
      {data.currentStockKg < 20 && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          Low stock! Please update stock soon.
        </Alert>
      )}

      {/* CHART */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" mb={2}>Daily Sales</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.salesChart}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#1976d2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default ShopDashboard;
