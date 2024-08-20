import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuCard from "./components/MenuCard";
import AdminPage from "./components/AdminPage";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuCard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/orders" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
