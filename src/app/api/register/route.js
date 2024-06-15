import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const { name, email, password } = body.data;
    console.log(body.data);
    if (!name || !email || !password) {
        //return new NextResponse("Missing name, email, or password" , { status: 400 }); //nenw prevent unexpcted end of json
        return NextResponse.json({ message: "missing" }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (exist) {
        //return new NextResponse("User already exists" , { status: 400 });
        return NextResponse.json({ message: "User already exists" }, { status: 400 });

    }
    else {
        return NextResponse.json({ message: "Registered Successfully" }, { status: 201 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    return new NextResponse(JSON.stringify(user));
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