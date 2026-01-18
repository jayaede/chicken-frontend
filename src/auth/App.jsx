import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppRoutes from "./routes";

export default function App() {
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
