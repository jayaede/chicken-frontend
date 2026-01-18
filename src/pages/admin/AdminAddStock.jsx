import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  CircularProgress
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5
      }}
    >
      <Card sx={{ width: 420 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Stock to Shop
          </Typography>

          {/* Shop Dropdown */}
          <TextField
            select
            label="Select Shop"
            fullWidth
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

          {/* Quantity */}
          <TextField
            label="Quantity (Kg)"
            type="number"
            fullWidth
            value={quantityKg}
            onChange={(e) => setQuantityKg(e.target.value)}
            margin="normal"
            inputProps={{ min: 1 }}
          />

          {/* Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Stock"}
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}
