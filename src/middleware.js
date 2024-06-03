import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    // Extract the token from the request
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // Check if the request is for the dashboard and if the token is missing
    if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to proceed if authenticated
    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
};



/*
import { NextResponse } from "next/server";

export function middleware(request) {

    //if(request.nextUrl.pathname!="/login"){
        return NextResponse.redirect(new URL("/login",request.url))
    //}
}

export const config={
    matcher:"/register/:path*"
}

*/