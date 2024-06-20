import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const POST = async(request) => {
    const body = await request.json();
    const { name, email, password } = body.data;

    try{
        const exist = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });
        
        if (exist) {
            return NextResponse.json({ message: "User already exists" });
        }
        else {
            return NextResponse.json({ message: "Registered Successfully" });
        }
    } catch(err) {
        console.log(err);
        return NextResponse.json({error: "Something went wrong!"});
    }
};