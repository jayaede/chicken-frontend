import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import axios from "../../services/api";

const StatCard = ({ title, value }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="subtitle2">{title}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Paper>
);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("daily");
  useEffect(() => {
    axios.get("/admin/dashboard").then(res => {
      setData(res.data);
    });
  }, []);
  const filteredChart = useMemo(() => {
    if (!data) return [];
    if (range === "daily") return data.salesChart;

    const map = {};
    data.salesChart.forEach(item => {
      const key =
        range === "weekly"
          ? item.date.slice(0, 7) + "-W"
          : item.date.slice(0, 7);

      map[key] = (map[key] || 0) + item.amount;
    });

    return Object.entries(map).map(([date, amount]) => ({
      date,
      amount
    }));
  }, [range, data]);

  if (!data) return null;

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Admin Dashboard
      </Typography>

      {/* STATS */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <StatCard title="Total Shops" value={data.totalShops} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Total Revenue" value={`₹ ${data.totalSalesMonth}`} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Today's Revenue" value={`₹ ${data.totalSalesToday}`} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Total Sold (KG)" value={data.totalSoldKg} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Remaining Stock (KG)" value={data.totalStockValue} />
        </Grid>
      </Grid>

      <ToggleButtonGroup
        value={range}
        exclusive
        onChange={(e, v) => v && setRange(v)}
        sx={{ mb: 2, mt: 4 }}
      >
        <ToggleButton value="daily">Daily</ToggleButton>
        <ToggleButton value="weekly">Weekly</ToggleButton>
        <ToggleButton value="monthly">Monthly</ToggleButton>
      </ToggleButtonGroup>

      {/* CHART */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" mb={2}>
          Shop-wise Revenue
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredChart}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="amount" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
