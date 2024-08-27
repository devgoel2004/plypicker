import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "./models/userModel";
import axios from "axios";
// import jwt from "jsonwebtoken";
import { getDataFromToken } from "./helpers/getDataFromToken";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/product/:path*" ||
    path === "/products";
  const token = request.cookies.get("token")?.value || "";
  const base64Url = token.split(".")[1];
  if (base64Url) {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const decodedToken = JSON.parse(jsonPayload);
    const id = decodedToken.id;
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/profile/:path*",
    "/products",
    "/product/:path*",
    "/pending-requests",
    "/pending-requests/:path*",
  ],
};
