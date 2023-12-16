import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img
        className="product-image"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="product-title">{product.title}</div>
    </div>
  );
};

export default Product;
