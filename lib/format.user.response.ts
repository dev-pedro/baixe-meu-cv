import { decryptData } from '@/utils/decrypt.data';
import { prisma } from './prisma';
import { UserDataResult } from '@/app/types/types';

export async function formatUserResponse(
  emailHash: string,
  isUpdate: boolean
): Promise<UserDataResult> {
  const updatedUser = await prisma.user.findUnique({
    where: { emailHash },
    include: {
      portfolio: true,
      courses: true,
      experiences: {
        include: {
          jobs: true,
        },
      },
      graduation: true,
    },
  });

  if (!updatedUser) throw new Error('Erro ao buscar usuário atualizado.');

  const { emailEncrypted, phoneEncrypted, ...userData } = updatedUser;
  const email = emailEncrypted ? await decryptData(emailEncrypted) : '';
  const phone = phoneEncrypted ? await decryptData(phoneEncrypted) : '';

  return {
    profile: {
      ...userData,
      image: updatedUser.image || '',
      username: updatedUser.username || '',
      name: updatedUser.name || '',
      bio: updatedUser.bio || '',
      profession: updatedUser.profession || '',
      city: updatedUser.city || '',
      showPhoneInPDF: updatedUser.showPhoneInPDF || false,
      showEmailInPDF: updatedUser.showEmailInPDF || false,
      public: updatedUser.public || false,
      template: updatedUser.template || 'modern',
      pickColor: updatedUser.pickColor || 5,
      email: email || '',
      phone: phone || '',
      portfolio: userData.portfolio ?? [],
      graduation: userData.graduation ?? [],
      experiences: userData.experiences ?? [],
      courses: userData.courses ?? [],
    },
    message: isUpdate
      ? `${updatedUser.name}. Seus dados foram atualizados com sucesso!`
      : `Bem-vindo, ${updatedUser.name}. Seu usuário foi criado com sucesso!`,
    error: false,
  };
}
