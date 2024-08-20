import React from "react";

const MenuItem = ({ name, price, onAddToCart }) => (
  <li className="flex justify-between items-center border-b border-gray-200 py-3 px-2 transition-transform transform hover:scale-105 hover:bg-yellow-100">
    <span className="text-gray-800">{name}</span>
    <span className="text-gray-600">₹{price}</span>
    <button
      onClick={() => onAddToCart(name, price)}
      className="ml-4 bg-yellow-500 text-white px-3 py-1 rounded transition-colors hover:bg-yellow-600"
    >
      Add to Cart
    </button>
  </li>
);

export default MenuItem;
