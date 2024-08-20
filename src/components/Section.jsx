import React from "react";
import MenuItem from "./MenuItem";

const Section = ({ title, items, onAddToCart }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-medium mb-4 text-red-600 transition-colors duration-300 hover:text-red-800">
      {title}
    </h3>
    <ul className="space-y-2">
      {Array.isArray(items) ? (
        items.map((item, index) => (
          <MenuItem
            key={index}
            name={item.name}
            price={item.price}
            onAddToCart={onAddToCart}
          />
        ))
      ) : (
        <li className="text-gray-500">No items available</li>
      )}
    </ul>
  </div>
);

export default Section;
