'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EditProfileClient from './form.profile';
import { getUserByEmailHash } from '@/lib/user';

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');
  const userSession = session.user;
  try {
    const result = await getUserByEmailHash(session?.user?.email || '');
    const message = result?.message || '';
    const error = result?.error || false;

    return (
      <div>
        <EditProfileClient userSession={userSession} message={message} />
      </div>
    );
  } catch (error: any) {
    console.error('Erro ao carregar usuário:', error);

    // Envia o erro como prop para a página client-side lidar com isso
    return (
      <div>
        <EditProfileClient message={error.mensagem} />
      </div>
    );
  }
}
