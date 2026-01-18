import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import Shops from "../pages/admin/Shops";
import Prices from "../pages/admin/Prices";
import AdminAddStock from "../pages/admin/AdminAddStock";
// Shop Pages
import ShopDashboard from "../pages/shop/ShopDashboard";
import Sales from "../pages/shop/Sales";
import SalesHistory from "../pages/shop/SalesHistory";

// Layouts
import AdminLayout from "../components/layout/AdminLayout";
import ShopLayout from "../components/layout/ShopLayout";

// Protected Route helpers
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  const { user } = useAuth();
  const token = user?.token;
  const role = user?.role;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? (user.role === "ADMIN" ? "/admin" : "/shop") : "/login"} replace />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute token={token} role={role} allowedRole="ADMIN">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="shops" element={<Shops />} />
          <Route path="prices" element={<Prices />} />
          <Route path="add-stock" element={<AdminAddStock />} />
        </Route>

        {/* Shop Routes */}
        <Route
          path="/shop"
          element={
            <PrivateRoute token={token} role={role} allowedRole="SHOP">
              <ShopLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<ShopDashboard />} />
          <Route path="sales" element={<Sales />} />
        </Route>
        
        <Route
          path="/shop/sales-history"
          element={
            <PrivateRoute token={token} role={role} allowedRole="SHOP">
              <ShopLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<SalesHistory />} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
  );
}

export default AppRoutes;
