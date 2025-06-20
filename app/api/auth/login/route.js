import connectToDB from "@/config/db";
import User from "@/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCurrentUser } from "@/utils/getCurrentUser";


export async function POST(req) {
  await connectToDB();
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    const usr = await getCurrentUser(req)
    if (!user)
      return NextResponse.json({ message: "Invalid account", success: false });

    const matchedPassword = await bcrypt.compare(password, user?.password);

    if (!matchedPassword)
      return NextResponse.json({ message: "Wrong password", success: false });

    const token = await jwt.sign(
      { userId: user?._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    const safeUser = user.toObject();
    delete safeUser?.password;

    const response = NextResponse.json({
      safeUser,
      message: "Sign In Successfully",
      success: true,
    });
    console.log("36",usr);
    
    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set("token",token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 2 * 24 * 60 * 60,
    });
 return response
  } catch (error) {
    console.log("Failed to login:",error);
    
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}
