import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const repo = await prisma.repository.findUnique({
        where: { id: String(id) },
      });

      if (!repo) {
        return res.status(404).json({ error: 'Repository not found.' });
      }

      res.status(200).json({ text: repo.text });
    } catch (error) {
      console.error('Database retrieval error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
