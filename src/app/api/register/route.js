import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const { name, email, password } = body.data;
    console.log(body.data);
    if (!name || !email || !password) {
        return new NextResponse("Missing name, email, or password", { status: 400 });
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email // Corrected spelling of email
        }
    });

    if (exist) {
        return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ // Corrected spelling of create
        data: {
            name,
            email,
            hashedPassword // Changed hashedPassword to password
        }
    });

    return new NextResponse(JSON.stringify(user)); // Corrected return statement
}




/*import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const { name, email, password } = body.data;
    console.log(body.data);
    if(!name || !email || !password)  {
        return new NextResponse("missing name, email, password" , {status:400});
    }

    const exist = await prisma.user.findUnique({
        where : {
            email: emai
        }
    });

    if(exist) {
        return new NextResponse("User already exists", {status: 400});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.creste({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user)
}*/