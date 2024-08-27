import { NextRequest, NextResponse } from "next/server";
import Request from "@/models/requestModel";
export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { requestId, status } = reqBody;
    const updateRequest = await Request.findById(requestId);
    if (!updateRequest) {
      return NextResponse.json({
        status: 400,
        error: "message not found",
      });
    }
    if (status === "Approved") {
      const updatedRequest = await Request.findByIdAndUpdate(
        { requestId },
        {
          status: "Approved",
        }
      );
      return NextResponse.json({
        status: 200,
        updatedRequest,
        message: "Your request has been accepted",
      });
    }
    if (status === "Rejected") {
      const updatedRequest = await Request.findByIdAndUpdate(
        { requestId },
        {
          status: "Rejected",
        }
      );
      return NextResponse.json({
        status: 200,
        updatedRequest,
        message: "Your request has been rejected",
      });
    }
    return NextResponse.json({
      status: 200,
      updateRequest,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: error.message,
    });
  }
}
