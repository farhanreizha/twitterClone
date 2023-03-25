import { NextApiRequest, NextApiResponse } from "next"
import serverAuth from "@/libs/serverAuth"
import prisma from "@/libs/prismadb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== "") return res.status(405).end()

   try {
      await prisma
   } catch (err) {
      console.error(err)
      res.status(400).end()
   }
}
