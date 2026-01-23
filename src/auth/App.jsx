import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppRoutes from "./routes";
import { useAutoReloadOnUpdate } from "../hooks/useAutoReloadonUpdate";
import { Box, CircularProgress } from "@mui/material";

export default function App() {
  useAutoReloadOnUpdate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
