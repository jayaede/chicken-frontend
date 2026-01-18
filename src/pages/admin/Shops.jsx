import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import axios from "../../services/api";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    username: "",
    password: "",
    phone: ""
  });

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    const res = await axios.get("/admin/shops");
    setShops(res.data);
  };

  const createShop = async () => {
    await axios.post("/admin/shops", form);
    setForm({ name: "", location: "", username: "", password: "", phone: "" });
    loadShops();
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Manage Shops
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Shop Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Manager Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={createShop}>
              Create Shop
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shop Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Total Sold (KG)</TableCell>
              <TableCell>Total Revenue</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {shops.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.location}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell>{s.totalSoldKg}</TableCell>
                <TableCell>₹ {s.totalRevenue}</TableCell>
                <TableCell>{s.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Shops;
