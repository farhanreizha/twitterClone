import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prismadb"

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "email", type: "text" },
            passwod: { label: "passwod", type: "passwod" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.passwod) throw new Error("Invalid credentials")

            const user = await prisma.user.findUnique({
               where: {
                  email: credentials.email,
               },
            })

            if (!user || !user?.hashedPassword) throw new Error("Invalid credentials")

            const isCorrectPassword = await bcrypt.compare(credentials.passwod, user.hashedPassword)

            if (!isCorrectPassword) throw new Error("Invalid credentials")

            return user
         },
      }),
   ],
   debug: process.env.NODE_ENV === "development",
   session: {
      strategy: "jwt",
   },
   jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
   },
   secret: process.env.NEXTAUTH_SECRET,
})
