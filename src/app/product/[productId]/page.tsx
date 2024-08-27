"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function ProductDetails({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const id = params.productId;
  const [productDetail, setProductDetail] = useState({
    productName: "",
    price: "",
    image: "",
    productDescription: "",
    department: "",
    id: "",
  });
  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://64e0caef50713530432cafa1.mockapi.io/api/products/${id}`
      );
      const product = response.data;
      console.log(response);
      setProductDetail({
        productName: product.productName,
        price: product.price,
        image: product.image,
        productDescription: product.productDescription,
        department: product.department,
        id: product.id,
      });
    } catch (error: any) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <img
            src={productDetail.image}
            alt={productDetail.productName}
            className="w-full h-45 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-4">
            {productDetail.productName}
          </h1>
          <p className="text-gray-700 text-md mb-6">
            {productDetail.productDescription}
          </p>
          <p className="text-md font-semibold mb-6">${productDetail.price}</p>
          <button className="bg-blue-500 text-white py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-300 mb-6">
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
