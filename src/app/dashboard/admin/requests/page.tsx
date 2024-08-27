"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function Requests() {
  const [requests, setRequests] = useState([]);
  const getallRequests = async () => {
    try {
      const response = await axios.get(`/api/products/admin/requests`);
      setRequests(response.data.requests);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallRequests();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 ">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
            Team Member Requests
          </h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Team Member
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Requested Changes
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests &&
                  requests.map((request: any) => (
                    <>
                      <tr>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm">
                          {request._id}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm capitalize">
                          {request.username}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm">
                          <Link
                            href={`/dashboard/admin/requests/${request._id}`}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                            Details
                          </Link>
                        </td>
                        <td
                          className={`py-4 px-4 border-b border-gray-200 text-sm ${
                            request.status === "Pending"
                              ? "text-yellow-500"
                              : ""
                          }
            ${request.status === "Approved" ? "text-green-500" : ""}
            ${request.status === "Rejected" ? "text-red-500" : ""} `}>
                          {request.status}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
