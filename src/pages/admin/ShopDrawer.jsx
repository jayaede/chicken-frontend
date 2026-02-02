import React, {useState,useEffect} from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MiniSparkline from "./MiniSparkline";
import axios from "../../services/api";

export default function ShopDrawer({ open, shop, onClose }) {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!shop) return;
    getShopSalesTrend(shop._id);
  }, [shop]);

  const getShopSalesTrend = async (shopId) => {
    try {
      setLoading(true);
      let res = await axios.get(`sales/trend/${shopId}`);
      setTrend(res.data);
    } catch (err) {
      setTrend([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: isMobile
          ? { height: "60%", borderRadius: "16px 16px 0 0" }
          : { width: 360 },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{shop.name}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography>
          <b>Phone:</b> {shop.phone}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          <b>Stock Left:</b> {shop.stockLeft} kg
        </Typography>

        {shop.stockLeft < 10 && (
          <Typography color="error" sx={{ mt: 1 }}>
            ⚠️ Low stock alert
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2">
          Sales Trend
        </Typography>

        {trend.length === 0 ? (
          <Typography color="text.secondary">
            No sales data
          </Typography>
        ) : (
          <MiniSparkline data={trend} />
        )}
      </Box>
    </Drawer>
  );
}
