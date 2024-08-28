"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loginFunction = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.data.status === 400) {
        alert(response.data.error);
      } else {
        alert("Login Success");
        if (response.data.user.role === "admin") {
          router.push(`/dashboard/admin/${response.data.user._id}`);
        } else {
          router.push(`/dashboard/team-member/${response.data.user._id}`);
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <div className="min-h-10  align-middle justify-center">
            <h1 className="text-3xl mt-5 font-semibold text-gray-800 mb-10 text-center">
              Team Member Requests
            </h1>
            <br />
            <div className="flex justify-center">
              <FaSpinner className="min-h-full text-4xl text-gray-500 animate-spin-slow" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-6"></h2>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter your Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-600 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  placeholder="Enter your Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-6 flex justify-center align-center">
                <button
                  onClick={loginFunction}
                  className="w-half bg-blue-500 text-white py-2 px-4 mr-5 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700">
                  Login
                </button>
                <Link
                  href={"/signup"}
                  className=" w-half bg-green-500 py-2 px-4 text-white rounded-lg hover:bg-green-600">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
