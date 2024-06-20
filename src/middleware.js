import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

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