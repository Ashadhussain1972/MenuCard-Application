import React, { useState } from "react";
import menuData from "../menu_with_prices.json";
import CuisineSection from "./CuisineSection";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import PasswordPrompt from "./PasswordPrompt";

const MenuCard = () => {
  const [cart, setCart] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleAddToCart = (name, price) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[name]) {
        updatedCart[name].quantity += 1;
      } else {
        updatedCart[name] = { price, quantity: 1 };
      }
      return updatedCart;
    });
  };

  const totalBill = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
      const orderData = {
        cart,
        totalBill,
        timestamp: new Date(),
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order ID: ", docRef.id);

      alert("Order placed successfully!");
      setCart({});
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order");
    }
  };

  return (
    <div className="menu-card p-6 max-w-4xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg relative">
      <h1 className="text-4xl font-extrabold mb-8 text-red-400 text-center transition-transform transform hover:scale-105">
        Menu
      </h1>

      {!isAuthenticated && (
        <>
          <button
            onClick={() => setShowPasswordPrompt(true)}
            className="absolute top-4 right-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Admin Login
          </button>
          {showPasswordPrompt && (
            <PasswordPrompt
              onAuthenticate={() => {
                setIsAuthenticated(true);
                setShowPasswordPrompt(false);
              }}
            />
          )}
        </>
      )}

      {isAuthenticated && (
        <button
          onClick={() => window.location.href = '/admin'}
          className="absolute top-4 right-4 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Go to Admin Page
        </button>
      )}

      {Object.entries(menuData).map(([cuisine, sections]) => (
        <CuisineSection
          key={cuisine}
          cuisine={cuisine}
          sections={sections}
          onAddToCart={handleAddToCart}
        />
      ))}

      <div className="mt-8 border-t border-gray-700 pt-4">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">
          Cart Summary
        </h2>
        <ul className="mt-2 space-y-2 bg-gray-800 p-4 rounded-lg shadow-md">
          {Object.keys(cart).length > 0 ? (
            Object.entries(cart).map(([itemName, itemDetails]) => (
              <li
                key={itemName}
                className="flex justify-between items-center border-b border-gray-700 py-2 px-2 hover:bg-gray-700 transition-colors"
              >
                <span className="text-gray-300 font-medium">
                  {itemName} (x{itemDetails.quantity})
                </span>
                <span className="text-gray-400 font-bold">
                  ₹{itemDetails.price * itemDetails.quantity}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No items in cart</li>
          )}
        </ul>
        <div className="mt-4 text-xl font-semibold text-red-400">
          Total Bill: ₹{totalBill}
        </div>
        <button
          onClick={handleOrder}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
