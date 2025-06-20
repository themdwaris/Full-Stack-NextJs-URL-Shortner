

import connectToDB from "@/config/db";
import URL from "@/model/urlModel";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  await connectToDB();
  try {
    const shortCode = await params.shortCode;
    const url = await URL.findOne({ shortCode });
    if (!url)
      return NextResponse.json({ message: "Url not found", success: false });

    const headersList = headers();
    let ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    // 👇 fallback for localhost testing
    if (ip === "::1" || ip === "127.0.0.1" || ip === "unknown") {
      ip = "8.8.8.8"; // or any valid IP
    }

    // 📍 Get location from IP using ipapi.co
    let city = "unknown",
      region = "unknown";
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();
      city = data.city || "unknown";
      region = data.region || "unknown";
    } catch (err) {
      console.error("IP location fetch failed:", err.message);
    }

    // 📝 Update clickStats + totalClicks
    await URL.updateOne(
      { _id: url?._id },
      {
        $push: {
          clickStats: {
            time: new Date(),
            ip,
            city,
            region,
            clickCount:1
          },
        },
        $inc: { totalClicks: 1 },
      }
    );

    // Redirect to original url
    return NextResponse.redirect(url?.originalUrl);
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

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
