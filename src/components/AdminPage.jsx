import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        setTotalOrders(ordersSnapshot.size);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleGoToOrders = () => {
    navigate("/orders");
  };

  if (loading) return <div className="text-white text-center p-4">Loading...</div>;

  return (
    <div className="admin-page h-screen p-6 bg-gray-900 text-white flex flex-col justify-between">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-red-400 text-center">
          Admin Page
        </h1>
      </header>
      <main className="flex-grow mb-6 p-4 bg-gray-800 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Admin Metrics</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-700 rounded">
            <span className="text-lg font-medium">Total Orders:</span>
            <span className="text-xl font-bold">{totalOrders}</span>
          </div>
        </div>
      </main>
      <footer>
        <button
          onClick={handleGoToOrders}
          className="w-full bg-green-600 text-white px-4 py-2 rounded transition-colors hover:bg-green-700"
        >
          View Orders
        </button>
      </footer>
    </div>
  );
};

export default AdminPage;
