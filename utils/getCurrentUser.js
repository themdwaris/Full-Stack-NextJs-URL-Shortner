import connectToDB from "@/config/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/model/userModel";


export async function getCurrentUser(req) {
    await connectToDB()
  try {
    const token = req.cookies.get('token')?.value
    if(!token) return NextResponse.json({message:"Right now, you are unauthorized",success:false})
    
    const decode = await jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decode?.userId).select('-password')
    if(!user) return null
    return user
  } catch (error) {
    console.log("Failed to get current user:", error);

    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}
