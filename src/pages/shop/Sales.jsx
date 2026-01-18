import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "../../services/api";
import CUT_TYPES from "../../constants/CutTypes";
const Sales = () => {
  const [customerName, setCustomerName] = useState("");
  const [cutType, setCutType] = useState("");
  const [quantityKg, setQuantityKg] = useState(0);
  const [pricePerKg, setPricePerKg] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });
  const [prices, setPrices] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  /* 🔹 Auto calculate total */
  useEffect(() => {
    const selectedPrice =
      prices.find((p) => p.cutType === cutType)?.pricePerKg || 0;
    setPricePerKg(selectedPrice);
    const total = Number(quantityKg) * Number(pricePerKg);
    setTotalAmount(total > 0 ? total : 0);
  }, [quantityKg, cutType]);

  /* 🔹 Load prices from backend */
  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await axios.get("/prices");
      setPrices(res.data);
    } catch (err) {
      setSnack({ open: true, msg: "Failed to load prices", type: "error" });
    }
  };

  const submitSale = async () => {
    try {
      setLoading(true);
      await axios.post("/sales/update", {
        shopId: storedUser.shopId,
        customerName,
        cutType,
        quantityKg: Number(quantityKg),
        pricePerKg,
        totalAmount
      });

      setSnack({ open: true, msg: "Sale recorded successfully", type: "success" });
      setCustomerName("");
      setQuantityKg("");
      setTotalAmount(0);
      setCutType("");
      setPricePerKg("");
    } catch (err) {
      setSnack({ open: true, msg: "Failed to record sale", type: "error" });    
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        New Sale
      </Typography>

      <Grid container spacing={2}>
        {/* Customer Name */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Customer Name"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Grid>

        {/* Cut Type */}
        <Grid item xs={12} md={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Cut Type</InputLabel>
            <Select
              value={cutType}
              label="Cut Type"
              onChange={(e) => setCutType(e.target.value)}
            >
              {CUT_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Quantity */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Quantity (Kg)"
            type="number"
            fullWidth
            value={quantityKg}
            onChange={(e) => setQuantityKg(e.target.value)}
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Price / Kg"
            type="number"
            fullWidth
            value={pricePerKg}
            disabled
          />
        </Grid>

        {/* Total */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Total Amount"
            fullWidth
            value={totalAmount}
            disabled
          />
        </Grid>

        {/* Submit */}
        <Grid item xs={12} md={4} alignSelf="flex-end">
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={submitSale}
            disabled={loading || !quantityKg || !pricePerKg}
          >
            Add Sale
          </Button>
        </Grid>
      </Grid>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Sales;
