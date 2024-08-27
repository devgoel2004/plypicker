import { NextRequest, NextResponse } from "next/server";
import Request from "@/models/requestModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET(request: NextRequest) {
  try {
    const requests = await Request.find();
    if (!requests) {
      return NextResponse.json({
        message: "No request found",
        status: 201,
      });
    }
    return NextResponse.json({
      requests,
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
