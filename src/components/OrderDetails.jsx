import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; 

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);

      // Mark the order as completed....
      await updateDoc(orderDocRef, { status: "completed" });

      // Delete the order from Firestore..
      await deleteDoc(orderDocRef);

      // Remove the completed order from the UI...
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error("Error completing order:", err);
      alert("Failed to complete the order");
    }
  };

  if (loading) return <div className="text-center text-gray-400">Loading...</div>;
  if (error) return <div className="text-center text-red-400">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Order Details</h1>
      <ul className="space-y-4">
        {orders.length > 0 ? (
          orders.map(order => (
            <li key={order.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-md">
              <h2 className="text-2xl font-semibold text-yellow-300">Order ID: {order.id}</h2>
              <p className="text-lg text-gray-400">Total Bill: ₹{order.totalBill}</p>
              <p className="text-sm text-gray-500">Timestamp: {new Date(order.timestamp.toDate()).toLocaleString()}</p>
              <h3 className="text-xl font-medium text-yellow-300 mt-4">Items:</h3>
              <ul className="list-disc list-inside ml-6 mt-2">
                {Object.entries(order.cart).map(([itemName, itemDetails]) => (
                  <li key={itemName} className="text-gray-400">
                    {itemName} (x{itemDetails.quantity}): ₹{itemDetails.price * itemDetails.quantity}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCompleteOrder(order.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded transition-colors hover:bg-red-700"
              >
                Complete Order
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No orders available</li>
        )}
      </ul>
    </div>
  );
};

export default OrderDetails;
