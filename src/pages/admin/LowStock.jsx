import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "../../services/api";

const LowStock = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get("/admin/low-stock").then(res => setShops(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>Low Stock Shops</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shop</TableCell>
            <TableCell>Remaining KG</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shops.map(s => (
            <TableRow key={s._id}>
              <TableCell>{s.shopName}</TableCell>
              <TableCell>{s.remainingKg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default LowStock;
