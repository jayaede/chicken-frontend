import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "../../services/api";
import Snackbar from "../../components/common/Snackbar";
import ShopDrawer from "./ShopDrawer";
import ShopCard from "./ShopCard";

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
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const res = await axios.get("/admin/shops");
      setShops(res.data);
    } catch (err) {
      setSnack({ open: true, msg: "Failed to load shops", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const filteredShops =
    filter === "low"
      ? shops.filter((s) => s.stockLeft < 10)
      : shops;

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

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

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, val) => val && setFilter(val)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="all">All Shops</ToggleButton>
        <ToggleButton value="low">Low Stock</ToggleButton>
      </ToggleButtonGroup>

       <Grid container spacing={2}>
        {filteredShops.map((shop) => (
          <Grid item xs={12} md={4} key={shop._id}>
            <ShopCard
              shop={shop}
              onClick={() => {
                setSelectedShop(shop)
                setOpenDrawer(true)
              }}
            />
          </Grid>
        ))}
      </Grid>

      {selectedShop && <ShopDrawer
        open={openDrawer}
        shop={selectedShop}
        onClose={() => setOpenDrawer(false)}
      />}
      <Snackbar
        open={snack.open}
        message={snack.msg}
        severity={snack.type}
      />
    </Box>
  );
};

export default Shops;
