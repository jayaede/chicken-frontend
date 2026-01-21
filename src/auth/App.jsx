import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppRoutes from "./routes";
import { useAutoReloadOnUpdate } from "../hooks/useAutoReloadonUpdate";

export default function App() {
  useAutoReloadOnUpdate();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
