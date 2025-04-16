// lib/mongodb.ts (ou lib/user.ts)
import { connectToDatabase } from './mongodb';

export async function getUserByUsername(username: string) {
  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ username });
  console.log('User found:', username);

  // Opcional: remove _id do retorno
  if (!user) return null;

  const { _id, ...rest } = user;
  return rest;
}
