import {connect} from "@/dbConfig/bdConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";  
import jwt from "jsonwebtoken";

connect()
 
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 404})
        }

        //hash password
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        } 

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
 
        // create a new token
        const token = await jwt.sign(tokenData, 'nextjsfirstapp', {expiresIn: '7h'})
        // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '7h'})
        console.log(user); 
        
        const response = NextResponse.json({
            message: "User loggedIn successfully",
            success: true 
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        

        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}