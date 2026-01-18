import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

export default function Sidebar({ role, open, onClose }) {
  const navigate = useNavigate();

  const adminItems = [
    { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { label: "Shops", path: "/admin/shops", icon: <StoreIcon /> },
    { label: "Prices", path: "/admin/prices", icon: <AttachMoneyIcon /> },
    { label: "Add Stock", path: "/admin/add-stock", icon: <InventoryIcon /> }
  ];

  const shopItems = [
    { label: "Dashboard", path: "/shop", icon: <DashboardIcon /> },
    { label: "Sales", path: "/shop/sales", icon: <AttachMoneyIcon /> },
    { label: "Sales History", path: "/shop/sales-history", icon: <AttachMoneyIcon /> }
  ];

  const items = role === "ADMIN" ? adminItems : shopItems;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("shopId");
    navigate("/login");
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth
        }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item) => (
            <ListItem
              key={item.path}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
