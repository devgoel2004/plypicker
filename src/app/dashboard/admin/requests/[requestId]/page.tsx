"use client";
import axios from "axios";
import { useEffect, useState } from "react";
export default function RequestDetails({
  params,
}: {
  params: {
    requestId: String;
  };
}) {
  const [request, setRequest] = useState({
    productName: "",
    image: "",
    productDescription: "",
    department: "",
  });
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");
  const approveRequest = async () => {
    try {
      const status = "Approved";
      const id = params.requestId;
      const response = await axios.put(`/api/products/admin`, {
        status,
        requestId: id,
      });
      const updateProduct = await axios.put(
        `https://64e0caef50713530432cafa1.mockapi.io/api/products/${productId}`,
        {
          productName,
          image,
          productDescription,
          price,
          department,
        }
      );
      alert("Approved");
    } catch (error) {
      alert("Something went wrong");
    }
  };
  const rejectRequest = async () => {
    try {
      const status = "Rejected";
      const id = params.requestId;
      const response = await axios.put(`/api/products/admin`, {
        status,
        requestId: id,
      });
      alert("Rejected");
    } catch (error) {
      alert("Something went wrong");
    }
  };
  const id = params.requestId;
  const getRequestDetails = async () => {
    try {
      const response = await axios.post(`/api/products/admin/request`, { id });
      const request = response.data.requests;
      console.log(request);
      setProductName(request.productName);
      setImage(request.image);
      setPrice(request.price);
      setProductDescription(request.productDescription);
      setDepartment(request.department);
      setProductId(request.productId);
      setStatus(request.status);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRequestDetails();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Request Details</h1>
        <div className="space-y-6">
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={productName}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold">{productName}</h2>
            <p className="text-gray-700">{productDescription}</p>
            <p className="text-gray-500 text-sm">Department: {department}</p>
          </div>
          <div
            className={`flex space-x-3 ${
              status === "Pending" ? "text-yellow-500" : ""
            }
            ${status === "Approved" ? "text-green-500" : ""}
            ${status === "Rejected" ? "text-red-500" : ""}`}>
            <p>{status}</p>
            <button
              onClick={approveRequest}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Approve
            </button>
            <button
              onClick={rejectRequest}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
