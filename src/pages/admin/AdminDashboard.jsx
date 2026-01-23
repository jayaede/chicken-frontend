import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  CircularProgress
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import axios from "../../services/api";
import Snackbar from "../../components/common/Snackbar";

const StatCard = ({ title, value }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="subtitle2">{title}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Paper>
);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("daily");
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
      {/* STATS */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <StatCard title="Total Shops" value={data.totalShops} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Total Revenue" value={`₹ ${data.totalSoldKg.totalAmount}`} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Today's Revenue" value={`₹ ${data.totalSalesToday.total}`} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Total Sold (KG)" value={data.totalSoldKg.total} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Today Sold (KG)" value={data.totalSalesToday.totalKg} />
        </Grid>
        <Grid item xs={3}>
          <StatCard title="Stock Left (KG)" value={data.totalStockValue} />
        </Grid>
      </Grid>

      {/* CHART */}
      <Grid xs={12} md={8} spacing={2} my={4}>
        <Card sx={{ borderRadius: 3, height: 350 }}>
          <CardContent>
            <ToggleButtonGroup
              value={range}
              exclusive
              onChange={(e, v) => v && setRange(v)}
              sx={{ mb: 2, mt: 4 }}
            >
              <ToggleButton value="daily">Daily Sale</ToggleButton>
              <ToggleButton value="weekly">Weekly Sale</ToggleButton>
              <ToggleButton value="monthly">Monthly Sale</ToggleButton>
            </ToggleButtonGroup>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredChart}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="amount" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid xs={12} md={4} spacing={2}>
        <Card sx={{ borderRadius: 3, height: 350 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Shop-wise Sales
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.shopWise}>
                <XAxis dataKey="shopName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalAmount" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
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
