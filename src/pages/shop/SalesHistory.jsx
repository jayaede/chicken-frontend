import { useEffect, useState } from "react";
import axios from "../../services/api";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box
} from "@mui/material";
import Snackbar from "../../components/common/Snackbar";

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Failed to load sales", err);
    } finally {
      setLoading(false);
    }
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
      <Typography variant="h6" gutterBottom>
        Sales History
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Cut Type</TableCell>
              <TableCell>Qty (Kg)</TableCell>
              <TableCell>Price / Kg</TableCell>
              <TableCell>Total (₹)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No sales found
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow key={sale._id}>
                  <TableCell>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{sale.customerName || "-"}</TableCell>
                  <TableCell>{sale.cutType}</TableCell>
                  <TableCell>{sale.quantityKg}</TableCell>
                  <TableCell>{sale.pricePerKg}</TableCell>
                  <TableCell>{sale.totalAmount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snack.open}
        message={snack.msg}
        type={snack.type}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </Paper>
  );
}
