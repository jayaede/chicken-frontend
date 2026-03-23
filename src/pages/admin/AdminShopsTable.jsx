import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";

export default function AdminShopsTable({ shops }) {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Shop</TableCell>
            <TableCell>Stock Added (kg)</TableCell>
            <TableCell>Current Stock (kg)</TableCell>
            <TableCell>Sold (kg)</TableCell>
            <TableCell>Wastage (kg)</TableCell>
            <TableCell>Sale Amount (₹)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {shops.map((shop) => {
            return (
              <TableRow key={shop._id}>
                <TableCell>{shop.name}</TableCell>
                <TableCell>{shop.totalStockAdded}</TableCell>
                <TableCell>{shop.currentStock}</TableCell>
                <TableCell>{shop.totalSoldKg}</TableCell>
                <TableCell>
                  {shop.wastage > 0 ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {shop.wastage} kg
                    </span>
                  ) : (
                    "0 kg"
                  )}
                </TableCell>
                <TableCell>
                  ₹ {shop.totalSaleAmount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}