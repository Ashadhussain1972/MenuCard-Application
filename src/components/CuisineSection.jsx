import React from "react";
import Section from "./Section";

const CuisineSection = ({ cuisine, sections, onAddToCart }) => (
  <div className="border-b border-gray-700 pb-6">
    <h2 className="text-3xl font-semibold mb-6 text-yellow-400 transition-colors duration-300 hover:text-yellow-500">
      {cuisine}
    </h2>
    {Object.entries(sections).map(([sectionTitle, items]) => (
      <Section
        key={sectionTitle}
        title={sectionTitle}
        items={items}
        onAddToCart={onAddToCart}
      />
    ))}
  </div>
);

export default CuisineSection;
