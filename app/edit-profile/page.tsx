'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EditProfileClient from './edit.profile.client';
import { getUserByEmailHash } from '@/lib/user';
import { decryptData } from '@/utils/decrypt.data';

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  try {
    const result = await getUserByEmailHash(session?.user?.email || '');
    const user = result?.user || null;
    const message = result?.message || '';
    const error = result?.error || false;
    const { phoneEncrypted, emailEncrypted, ...curriculo } = user || {
      phoneEncrypted: '',
      emailEncrypted: '',
      curriculo: {},
    };

    const email = emailEncrypted ? await decryptData(emailEncrypted) : '';
    const phone = phoneEncrypted ? await decryptData(phoneEncrypted) : '';

    const props = {
      curriculo,
      email,
      phone,
      userSession: session?.user || null,
      message,
      error,
    };

    return (
      <div>
        <EditProfileClient props={props} />
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar usuário:', error);

    // Envia o erro como prop para a página client-side lidar com isso
    return (
      <div>
        <EditProfileClient
          props={{ error: 'Erro ao carregar dados do usuário. Tente novamente mais tarde.' }}
        />
      </div>
    );
  }
}
