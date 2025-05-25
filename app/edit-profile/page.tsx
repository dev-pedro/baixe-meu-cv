'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EditProfileClient from './edit.profile.client';
import { getUserByEmailHash } from '@/lib/user';

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  const userSession = session.user;

  try {
    const result = await getUserByEmailHash(session?.user?.email || '');
    const message = result?.message || '';
    const error = result?.error || false;
    if (error) {
      throw new Error(message);
    }

    return (
      <div>
        <EditProfileClient userSession={userSession} />
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar usuário:', error);

    // Envia o erro como prop para a página client-side lidar com isso
    return (
      <div>
        <EditProfileClient />
      </div>
    );
  }
}
