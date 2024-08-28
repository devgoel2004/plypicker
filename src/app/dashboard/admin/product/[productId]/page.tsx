"use client";
import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
export default function UpdateProductAdmin({
  params,
}: {
  params: {
    productId: String;
  };
}) {
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const router = useRouter();
  const getProduct = async () => {
    try {
      setLoading(true);
      const productData = await axios.get(
        `https://64e0caef50713530432cafa1.mockapi.io/api/products/${params.productId}`
      );
      setProductName(productData.data.productName);
      setPrice(productData.data.price);
      setDepartment(productData.data.department);
      setDescription(productData.data.productDescription);
      setImage(productData.data.image);
    } catch (error: any) {
      alert(error.message);
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
          console.log(error);
        });
    }
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      const update = await axios.put(
        `https://64e0caef50713530432cafa1.mockapi.io/api/products/${params.productId}`,
        {
          productName,
          price,
          productDescription: description,
          department,
          image,
        }
      );
      alert("Product updated successfully");
      router.push("/dashboard/admin/product");
    } catch (error: any) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
    getProduct();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="min-h-10  align-middle justify-center">
            <h1 className="text-3xl mt-3 text-center font-bold mb-6 text-gray-800">
              Update Product
            </h1>
            <br />
            <div className="flex justify-center">
              <FaSpinner className="min-h-full text-4xl text-gray-500 animate-spin-slow" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
            <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">
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
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="p-2 mt-2">
              <label
                htmlFor="image"
                className="block text-md font-medium text-gray-700">
                Image
              </label>
              <input type="file" onChange={handleFileChange} />
              <button
                onClick={uploadImage}
                className="bg-blue-500 p-2 text-white ">
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                name="description"
                placeholder="Enter product description"
                className="mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <button
                onClick={updateProduct}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Update Product
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
