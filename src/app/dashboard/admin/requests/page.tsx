"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function Requests() {
  const router = useRouter();
  const [requestId, setRequestId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [requests, setRequests] = useState([]);
  const getallRequests = async () => {
    try {
      const response = await axios.get(`/api/products/admin/requests`);
      setRequests(response.data.requests);
    } catch (error: any) {
      console.log(error);
    }
  };
  const approveRequest = async () => {
    try {
      const response = await axios.put(`/api/products/admin`, {
        requestId,
        status: "Approved",
      });
      console.log(response);
      alert(`Approved ${requestId}`);
    } catch (error: any) {
      console.log(error);
    }
  };
  const rejectRequest = async () => {
    try {
      const response = await axios.put(`/api/products/admin`, {
        requestId,
        status: "Rejected",
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const goToDetails = () => {
    router.push(`/dashboard/admin/requests/${requestId}`);
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
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests &&
                  requests.map((request) => (
                    <>
                      <tr>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm">
                          REQ12345
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm">
                          {request.productName}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm">
                          <button
                            onClick={goToDetails}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                            Details
                          </button>
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm text-yellow-600">
                          Pending
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-sm">
                          <button
                            onClick={approveRequest}
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                            Approve
                          </button>
                          <button
                            onClick={rejectRequest}
                            className="bg-red-500 text-white px-5 py-1 rounded mt-2">
                            Reject
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 text-sm">
                    REQ12345
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-sm">
                    John Doe
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-sm">
                    <button
                      onClick={goToDetails}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Details
                    </button>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-sm text-yellow-600">
                    Pending
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-sm">
                    <button
                      onClick={approveRequest}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                      Approve
                    </button>
                    <button
                      onClick={rejectRequest}
                      className="bg-red-500 text-white px-5 py-1 rounded mt-2">
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
