"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Team({
  params,
}: {
  params: {
    userId: String;
  };
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [setLoading, setSetLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/users/me");
      if (response.data.status !== 200) {
        alert(response.data.error);
      } else {
        const user = response.data.user;
        setRole(user.role);
        setEmail(user.email);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };
  const navigateProducts = () => {
    console.log("hello");
    router.push(`/products`);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      alert(response.data.message);
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };
  const navigateRequests = () => {
    router.push("/dashboard/admin/requests");
  };
  useEffect(() => {
    if (role.length > 0 && email.length > 0) {
      setSetLoading(false);
    }
    fetchProfile();
  });

  return (
    <>
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {setLoading ? "Processing" : "User Profile"}
            </h2>
            <div className="mb-2">
              <span className="font-bold capitalize">Role:</span> {role}
            </div>
            <div className="mb-4">
              <span className="font-bold">Email:</span> {email}
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
              Logout
            </button>
            <button
              onClick={navigateProducts}
              className="bg-green-500  py-2 px-4 rounded-lg text-white mt-2 w-full">
              Products
            </button>
          </div>
        </div>
      </>
    </>
  );
}
