import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
        if (!req.body) {
            return res.status(400).json({ error: 'Bad Request' });
        }

        const { text } = req.body;

        try {
            const newPrompt = await prisma.prompt.create({
              data: { text },
            });
      
            res.status(200).json({ id: newPrompt.id });
          } catch (error) {
            console.error('Database insertion error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }     
}