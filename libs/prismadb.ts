import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
// declare global {
//    var prisma: PrismaClient | undefined
// }

// const client = global.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") global.prisma = client

export default prisma
