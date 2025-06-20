import connectToDB from "@/config/db";
import URL from "@/model/urlModel";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  await connectToDB();
  try {
    const user = await getCurrentUser(req);
  

    if (!user)
      return NextResponse.json({
        message: "Right now ur unauthorized",
        success: false,
      });

    const urls = await URL.find({ userId: user?._id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ urls, success: true });
  } catch (error) {
    console.log("Failed to get urls:", error);

    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

export async function POST(req) {
  await connectToDB();
  try {
    const user = await getCurrentUser(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized", success: false });

    const { originalUrl } = await req.json();
    if (!originalUrl)
      return NextResponse.json({ message: "Url is required", success: false });
    const shortCode = uuidv4().slice(0, 6);

    const newUrl = new URL({
      originalUrl,
      shortCode,
      userId: user?._id,
    });
    await newUrl.save();

    return NextResponse.json({
      shortUrl: `${process.env.BASE_URL}/api/${newUrl.shortCode}`,
      originalUrl: newUrl.originalUrl,
      success: true,
    });
  } catch (error) {
    console.log("Failed to short url:", error);

    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}
