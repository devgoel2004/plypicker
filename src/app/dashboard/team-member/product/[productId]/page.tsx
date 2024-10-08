"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useStyleRegistry } from "styled-jsx";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

export default function ProductDetails({
  params,
}: {
  params: {
    productId: String;
  };
}) {
  const id = params.productId;
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [image, setImage] = useState("");
  const [department, setDepartment] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const getUserId = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      setUserId(response.data.user._id);
    } catch (error: any) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const uploadImage = () => {
    if (imageUpload === null) {
      alert("Please choose the image");
      return;
    } else {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImage(url);
          });
          alert("Image uploaded");
        })
        .catch((error: any) => {
          alert("something went wrong");
        });
    }
  };
  const getProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://64e0caef50713530432cafa1.mockapi.io/api/products/${id}`
      );
      const product = response.data;
      setProductName(product.productName);
      setPrice(product.price);
      setImage(product.image);
      setProductDescription(product.productDescription);
      setDepartment(product.department);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sentRequest = async () => {
    try {
      const response = await axios.post(`/api/products/team-member`, {
        productName,
        price,
        image,
        productDescription,
        department,
        productId: id,
        requestedBy: userId,
      });
      alert("Request sent successfully");
    } catch (error: any) {
      alert("Something went wrong");
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      const file = files[0];
      setImageUpload(file);
    }
  };
  useEffect(() => {
    getProductDetails();
    getUserId();
  }, []);
  return (
    <>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Update Product
        </h1>
        <div className="p-2 mt-2">
          <label
            htmlFor="name"
            className="block text-md font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            id="name"
            name="name"
            placeholder="Enter product name"
            className="mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="p-2 mt-2">
          <label
            htmlFor="image"
            className="block text-md font-medium text-gray-700">
            Image
          </label>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadImage} className="bg-blue-500 p-2 text-white ">
            Upload Image
          </button>
          <img src={image} alt="" className="p-2" />
        </div>
        <div className="p-2 mt-2">
          <label
            htmlFor="price"
            className="block text-md font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            placeholder="Enter product price"
            className="mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="p-2 mt-2">
          <label
            htmlFor="department"
            className="block text-md font-medium text-gray-700">
            Department
          </label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            type="text"
            id="department"
            name="department"
            placeholder="Enter product department"
            className="mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="p-2 mt-2">
          <label
            htmlFor="description"
            className="block text-md font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            id="description"
            name="description"
            placeholder="Enter product description"
            className="mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div>
          <button
            onClick={sentRequest}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sent Request
          </button>
        </div>
      </div>
    </>
  );
}
