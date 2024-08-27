import { NextRequest, NextResponse } from "next/server";
import Request from "@/models/requestModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;
    const requests = await Request.findById(id);
    if (!requests) {
      return NextResponse.json({
        message: "Request not found",
        status: 400,
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
