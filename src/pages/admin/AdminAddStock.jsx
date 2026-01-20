import { useEffect, useState } from "react";
import {
  Paper,
  Button,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Grid
} from "@mui/material";
import axios from "../../services/api";
import Snackbar from "../../components/common/Snackbar";

export default function AdminAddStock() {
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // 🔹 Fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      const res = await axios.get("/admin/shops");
      setShops(res.data);
    };
    fetchShops();
  }, []);

  // 🔹 Add stock
  const handleSubmit = async () => {
    if (!shopId || !quantityKg) {
      setSnackbar({
        open: true,
        message: "Please select a shop and enter quantity",
        severity: "warning"
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("/stock/add", {
        shopId,
        quantityKg: Number(quantityKg)
      });
      setSnackbar({
        open: true,
        message: "Stock added successfully",
        severity: "success"
      });
      setShopId("");
      setQuantityKg("");
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to add stock",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
     <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Stock to Shop
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Select Shop"
            sx={{ minWidth: 220 }}
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
            margin="normal"
          >
            {shops.map((shop) => (
              <MenuItem key={shop._id} value={shop._id}>
                {shop.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Quantity (Kg)"
            type="number"
            value={quantityKg}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value < 1) return;
              setQuantityKg(value);
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading || !shopId || !quantityKg}
          >
            {loading ? <CircularProgress size={24} /> : "Add Stock"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Paper>
  );
}
