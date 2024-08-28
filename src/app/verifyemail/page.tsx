"use client";
import axios from "axios";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import React, { useEffect, useState } from "react";
export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(error);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2>
          {token ? (
            <div className="w-30 h-30 border-4 border-green-500 rounded-full">
              {" "}
              <TiTick className="text-8xl text-green-500" />
            </div>
          ) : (
            <div className="w-16 h-16 border-4 border-black-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          )}
        </h2>
        {verified && (
          <div>
            <h2 className="text-2xl text-center">Email Verified</h2>
            <h6 className="text-center">
              Your Email was successfully verified
            </h6>
            <div className="flex justify-center ">
              <Link
                className="bg-slate-500 px-4 p-2 text-white rounded-md mt-1"
                href="/login">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
