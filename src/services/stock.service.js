import api from "./api";

export const getStock = () => api.get("/shop/stock");
export const addStock = (data) => api.post("/shop/stock", data);
