

import connectToDB from "@/config/db";
import URL from "@/model/urlModel";
import { getCurrentUser } from "@/utils/getCurrentUser";

import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  await connectToDB();
  try {
    const user = await getCurrentUser(req);
    const {shortCode} = context.params;
    
    if (!user)
      return NextResponse.json({
        message: "Right now ur unauthorized",
        success: false,
      });
  
    const url = await URL.findOne({ shortCode });
    
    
    if (!url)
      return NextResponse.json({ message: "Url not found", success: false });

   
    
    if (url?.userId?.toString() !== user?._id?.toString())
      return NextResponse.json({
        message: "Something went wrong",
        success: false,
      });

    await URL.findByIdAndDelete(url?._id);
    return NextResponse.json({
      message: "URL Deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Failed to delete short url:", error);

    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}
