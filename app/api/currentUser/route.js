import connectToDB from "@/config/db";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(req){
    await connectToDB()
    try {
        const user = await getCurrentUser(req)
        if(!user){
            return NextResponse.json({message:"User not found or Unauthorized",success:false})
        }
        return NextResponse.json({user,success:true})
        
    } catch (error) {
        console.log("Failed to fetch current user:",error);
        return NextResponse.json({message:error.message||error,success:false})
        
    }
}