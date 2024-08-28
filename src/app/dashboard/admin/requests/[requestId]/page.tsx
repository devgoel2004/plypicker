"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
export default function RequestDetails({
  params,
}: {
  params: {
    requestId: String;
  };
}) {
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");
  const approveRequest = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  const rejectRequest = async () => {
    try {
      setLoading(true);
      const status = "Rejected";
      const id = params.requestId;
      const response = await axios.put(`/api/products/admin`, {
        status,
        requestId: id,
      });
      alert("Rejected");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const id = params.requestId;
  const getRequestDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/products/admin/request`, { id });
      const request = response.data.requests;
      setProductName(request.productName);
      setImage(request.image);
      setPrice(request.price);
      setProductDescription(request.productDescription);
      setDepartment(request.department);
      setProductId(request.productId);
      setStatus(request.status);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRequestDetails();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="min-h-10  align-middle justify-center">
            <h1 className="text-3xl mt-5 font-semibold text-gray-800 mb-10 text-center">
              Request Details
            </h1>
            <br />
            <div className="flex justify-center">
              <FaSpinner className="min-h-full text-4xl text-gray-500 animate-spin-slow" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Request Details
            </h1>
            <div className="flex justify-center  align-center">
              <div className="space-y-6">
                <div className="flex-shrink-0">
                  <img
                    src={image}
                    alt={productName}
                    className="w-30 h-30 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">
                    Product Name: {productName}
                  </h2>
                  <p className="text-gray-700">
                    Description: {productDescription}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Department: {department}
                  </p>
                </div>
                <div>
                  <p
                    className={`flex space-x-3 ${
                      status === "Pending" ? "text-yellow-500" : ""
                    }
            ${status === "Approved" ? "text-green-500" : ""}
            ${status === "Rejected" ? "text-red-500" : ""}`}>
                    {status}
                  </p>
                  <button
                    onClick={approveRequest}
                    className="bg-green-500 mr-3 text-white py-2 px-4 rounded-lg hover:bg-green-600">
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
          </div>
        </>
      )}
    </>
  );
}
