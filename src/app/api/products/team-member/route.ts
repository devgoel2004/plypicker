import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Request from "@/models/requestModel";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      productName,
      productDescription,
      price,
      image,
      department,
      productId,
      requestedBy,
      
    } = reqBody;
    const user = await User.findById(requestedBy);
    const username = user.username;
    const updateRequest = new Request({
      productId,
      productName,
      productDescription,
      price,
      image,
      department,
      requestedBy,
      username,
    });
    const updatedRequest = await updateRequest.save();
    console.log(updatedRequest);
    return NextResponse.json({
      message: "Updated Request",
      updatedRequest,
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: error,
    });
  }
}
