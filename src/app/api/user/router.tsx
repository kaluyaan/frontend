import { NextApiRequest, NextApiResponse } from 'next';

// Sample user data
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

// API route handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(users);
    } else if (req.method === 'POST') {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }
        const newUser = { id: users.length + 1, name };
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}