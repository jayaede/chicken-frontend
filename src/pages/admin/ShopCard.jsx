import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

export default function ShopCard({ shop, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        border:
          shop.stockLeft < 10 ? "1px solid red" : "1px solid #eee",
      }}
    >
      <CardContent>
        <Typography variant="h6">{shop.name}</Typography>
        <Typography color="text.secondary">
          📞 {shop.phone}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontWeight: 600,
            color: shop.stockLeft < 10
              ? "error.main"
              : "success.main",
          }}
        >
          {shop.stockLeft} kg left
        </Typography>

        {shop.stockLeft < 10 && (
          <Chip
            label="Low Stock"
            color="error"
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
