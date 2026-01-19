import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CUT_TYPES from "../../constants/CutTypes";
import axios from "../../services/api";

const Prices = () => {
  const [cutType, setCutType] = useState("");
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await axios.get("/prices");
      setPrices(res.data);
    } catch (err) {
      setSnack({ open: true, msg: "Failed to load prices", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditingId(row._id);
    setCutType(row.cutType);
    setPrice(row.pricePerKg);
  };

  const handleSave = async () => {
    try {
      await axios.post(`/prices/${editingId}`, {
        pricePerKg: Number(price)
      });
      setSnack({ open: true, msg: "Price updated", type: "success" });
      setEditingId(null);
      setCutType("");
      setPrice("");
      fetchPrices();
    } catch {
      setSnack({ open: true, msg: "Update failed", type: "error" });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/prices", {
        cutType,
        pricePerKg: Number(price)
      });
    } catch {
      setSnack({ open: true, msg: "Failed to add price", type: "error" });
    }
    setCutType("");
    setPrice("");
    fetchPrices();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Chicken Prices (Per KG)
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cut Type</TableCell>
              <TableCell>Price (₹ / KG)</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {prices.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.cutType}</TableCell>

                <TableCell>
                  {editingId === row._id ? (
                    <TextField
                      type="number"
                      size="small"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                    />
                  ) : (
                    `₹ ${row.pricePerKg}`
                  )}
                </TableCell>

                <TableCell align="right">
                  {editingId === row._id ? (
                    <IconButton onClick={() => handleSave(row)}>
                      <SaveIcon color="success" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <FormControl sx={{ minWidth: 100 }} >
                  <Select
                    value={cutType}
                    label="Cut Type"
                    onChange={(e) => setCutType(e.target.value)}
                    disabled={editingId !== null}
                  >
                    {CUT_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={price}
                  sx={{ minWidth: 100 }}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={editingId !== null}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  disabled={!cutType || !price || editingId !== null}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type}>{snack.msg}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default Prices;
