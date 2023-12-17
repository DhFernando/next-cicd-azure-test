import {connect} from "@/dbConfig/bdConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"; 
import { GetDataFromToken } from "@/helpers/getDataFromToken";


connect()


export async function GET(request: NextRequest){
    try {
        const userId = await GetDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password")
        if(user){
            return NextResponse.json({
                user,
                success: true
            })
        }else{
            return NextResponse.json({
                error: "User not found",
                success: false
            })
        }
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}