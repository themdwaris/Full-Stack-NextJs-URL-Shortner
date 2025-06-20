import connectToDB from "@/config/db";
import User from "@/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  await connectToDB();
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }
    const userExist = await User.findOne({ email });

    if (userExist)
      return NextResponse.json({
        message: "User already have an account",
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return NextResponse.json({
      message: "Sign Up Successfully",
      success: true,
    });

  } catch (error) {
    console.log("Failed to register:",error);
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}
