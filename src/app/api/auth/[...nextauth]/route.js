import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // ErrorProne
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
            //check to see if email and password valid
            if(!credentials.email || !credentials.password)  {
                return null;
            }
            // Check to see if the user exist
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            });

            if(!user) {
                return null;
            }

            //Check to see if the passwords matches
            const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

            if(!passwordsMatch) {
                return null;
            }

            // return user object if everything is valid
            return user;
            }
        })
    ],
    
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
