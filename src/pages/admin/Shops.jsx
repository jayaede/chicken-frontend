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
  const [errors, setErrors] = useState({});
  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    const res = await axios.get("/admin/shops");
    setShops(res.data);
  };

  const handleChange = (e, MAX_LENGTH) => {
    const { name, value } = e.target;
    if (value.length > MAX_LENGTH) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Maximum ${MAX_LENGTH} characters allowed`,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isFormValid = () => {
    return (
      form.name && !errors.name &&
      form.location && !errors.location &&
      form.password && !errors.password &&
      form.username && !errors.username &&
      form.phone && !errors.phone
    );
  }

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
              name="name"
              value={form.name}
              error={Boolean(errors.name)}
              helperText={errors.name}
              onChange={(e) => handleChange(e,50)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location}
              error={Boolean(errors.location)}
              helperText={errors.location}
              onChange={(e) => handleChange(e,50)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="username"
              label="Manager Username"
              value={form.username}
              error={Boolean(errors.username)}
              helperText={errors.username}
              onChange={(e) => handleChange(e,7)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={form.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={(e) => handleChange(e,8)}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="phone"
              label="Phone"
              value={form.phone}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              onChange={(e) => handleChange(e,10)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              variant="contained"
              onClick={createShop}
              disabled={isFormValid() ? false : true}
            >
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
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {shops.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.location}</TableCell>
                <TableCell>{s.phone}</TableCell>
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
