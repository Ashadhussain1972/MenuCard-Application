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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-page p-6 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-red-600 text-center">
        Admin Page
      </h1>
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Admin Metrics</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
            <span className="text-lg font-medium">Total Orders:</span>
            <span className="text-xl font-bold">{totalOrders}</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleGoToOrders}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded transition-colors hover:bg-green-600"
      >
        View Orders
      </button>
    </div>
  );
};

export default AdminPage;
