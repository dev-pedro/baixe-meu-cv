'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { encryptData } from '@/utils/encrypt.data';
import { hashEmail } from '@/utils/hash.email';

export async function updateProfile({
  name,
  profissao,
  bio,
}: {
  name: string;
  profissao?: string;
  bio?: string;
}) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) throw new Error('Usuário não autenticado.');

  const hashedEmail = await hashEmail(userEmail); // use a mesma função de quando você salvou

  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  const result = await usersCollection.updateOne(
    { emailHash: hashedEmail },
    {
      $set: {
        name,
        updatedAt: new Date(),
      },
    }
  );

  if (result.modifiedCount === 0) {
    throw new Error('Não foi possível atualizar o perfil.');
  }

  return { success: true };
}
