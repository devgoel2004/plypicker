"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
export default function ProductDetails({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const router = useRouter();
  const id = params.productId;
  const [productDetail, setProductDetail] = useState({
    productName: "",
    price: "",
    image: "",
    productDescription: "",
    department: "",
    id: "",
  });
  const navigate = () => {
    router.push(`/dashboard/team-member/product/${id}`);
  };
  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://64e0caef50713530432cafa1.mockapi.io/api/products/${id}`
      );
      const product = response.data;
      setProductDetail({
        productName: product.productName,
        price: product.price,
        image: product.image,
        productDescription: product.productDescription,
        department: product.department,
        id: product.id,
      });
    } catch (error: any) {
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <div className="flex align-center justify-center min-h-screen container mx-auto px-4 py-8">
      <div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex justify-center">
            <img
              src={productDetail.image}
              alt={productDetail.productName}
              className="w-30 h-30  object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold mb-4">
              Product Name: <span>{productDetail.productName}</span>
            </h1>
            <p className="text-gray-700 text-md mb-6">
              {productDetail.productDescription}
            </p>
            <p className="text-md font-semibold mb-6">${productDetail.price}</p>
            <p className="text-md mb-6">{productDetail.department}</p>
            <button
              onClick={navigate}
              className="bg-blue-500 text-white py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-300 mb-6">
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
