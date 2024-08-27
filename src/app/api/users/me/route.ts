import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({
        error: "no user found",
        status: 400,
      });
    }
    return NextResponse.json({
      message: "User found successfully",
      user,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
