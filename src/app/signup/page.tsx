"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "team member",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      alert(response.data.message);
      if (response.data.status === 201) {
        alert("open email to verify");
        router.push("/login");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.role.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            {loading ? "Processing" : "Signup"}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium mb-2">
              UserName
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              placeholder="Enter your email"
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-600 text-sm font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="team member">Team Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-6 flex align-center text-center justify-center ">
            <button
              onClick={signup}
              className="w-half bg-blue-500 text-white py-2 px-4 mr-5 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700">
              {buttonDisabled ? "No SignUp" : "Sign Up"}
            </button>
            <Link
              href={"/login"}
              className=" w-half bg-green-500 py-2 px-4 text-white rounded-lg hover:bg-green-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
