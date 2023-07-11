import type { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const {q: query} = req.query;

            if (typeof query !== 'string') {
                throw new Error('Invalid request')
            }

            const iGs = await prisma.iG.findMany({
                where: {
                    category: {
                        contains: query,
                        mode: 'insensitive'
                    }
                }   
            }); 

            res.status(200).json({ iGs });

        } catch (error) {
            res.status(500).end();
        }
    } 

}