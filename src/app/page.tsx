"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
export default function Home() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await axios.get(
      "https://64e0caef50713530432cafa1.mockapi.io/api/products"
    );
    setProducts(response.data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white shadow-sm hover:drop-shadow-lg rounded-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-48 object-cover p-1 pt-2 "
              />
              <div className="p-4">
                <h2 className="text-md font-bold mb-2">
                  {product.productName}
                </h2>
                <p className="text-gray-700 mb-4 text-sm">
                  {product.productDescription}
                </p>
                <p className=" font-semibold text-sm">${product.price}</p>
                <p className="text-sm font-semibold mb-2">
                  {product.department}
                </p>
                <Link
                  className="text-sm  bg-green-500 p-2  text-white"
                  href={`/product/${product.id}`}>
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
