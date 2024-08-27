"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getDataFromToken } from "@/helpers/getDataFromToken";
export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [setLoading, setSetLoading] = useState(true);
  const fetchProfile = async () => {
    try {
      const id = getDataFromToken();
      const response = await axios.post("/api/users/me", { id });
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
    if (role.length > 0 && email.length > 0) {
      setSetLoading(false);
    }
    fetchProfile();
  });

  return (
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
        </div>
      </div>
    </>
  );
}
