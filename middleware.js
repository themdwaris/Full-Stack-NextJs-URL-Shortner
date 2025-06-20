import { NextResponse } from "next/server";

export function middleware(req){
    try {
        const token = req?.cookies?.get('token')?.value
        const url = req?.nextUrl

        if(!token&&url?.pathname==='/urlList'){
            return NextResponse.redirect(new URL('/login',req?.url))
        }

        if(token&&url.pathname==='/login'){
            return NextResponse.redirect(new URL('/',req?.url))
        }
        return NextResponse.next()
    } catch (error) {
        console.log("Failed in middleware:",error);
        
    }
}

export const config={
    matcher:['/','/urlList','/login']
}