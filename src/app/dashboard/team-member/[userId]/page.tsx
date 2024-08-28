"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
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
  const [loading, setLoading] = useState(true);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      if (response.data.status !== 200) {
        alert(response.data.error);
      } else {
        const user = response.data.user;
        setRole(user.role);
        setEmail(user.email);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const navigateProducts = () => {
    router.push(`/dashboard/team-member`);
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
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="min-h-10  align-middle justify-center">
            <h1 className="text-3xl mt-5 font-semibold text-gray-800 mb-10 text-center">
              Profile
            </h1>
            <br />
            <div className="flex justify-center">
              <FaSpinner className="min-h-full text-4xl text-gray-500 animate-spin-slow" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {loading ? "Processing" : "User Profile"}
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
      )}
    </>
  );
}
