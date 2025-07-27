// lib/user.ts
'use server';
import { prisma } from '@/lib/prisma';
import { hashEmail } from '@/utils/hash.email';
import { encryptData } from '@/utils/encrypt.data';
import { DataCreateCurriculoForm, UserDataResult } from '@/app/types/types';
import { decryptData } from '@/utils/decrypt.data';
import { updateUser } from './update.user';
import { createUser } from './user.create';

export async function getUserByUserName(username: string): Promise<UserDataResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      include: {
        portfolio: true,
        courses: true,
        experiences: {
          include: {
            jobs: true, // ✅ Inclui os jobs dentro de cada experience
          },
        },
        graduation: true,
        // Se quiser incluir mais:
      },
    });

    if (!user)
      return {
        profile: null,
        message: 'Currículo ainda não cadastrado ou usuário não encontrado.',
        error: true,
      };
    const { id, phoneEncrypted, emailHash, emailEncrypted, ...profile } = user;
    const email = emailEncrypted ? await decryptData(emailEncrypted) : 'baixemeucv@gmail.com';
    const phone = phoneEncrypted ? await decryptData(phoneEncrypted) : '';

    return {
      profile: {
        ...profile,
        email: email || '',
        phone: phone || '',
        image: profile.image === null ? undefined : profile.image,
        bio: profile.bio === null ? undefined : profile.bio,
        pickColor: profile.pickColor || 5,
        profession: profile.profession || '',
        city: profile.city || '',
        showPhoneInPDF: profile.showPhoneInPDF || false,
        showEmailInPDF: profile.showEmailInPDF || false,
        public: profile.public || false,
        template: profile.template || 'modern',
      },
      message: '',
      error: false,
    };
  } catch (error) {
    console.error('Erro ao buscar usuário por username:', error);
    return {
      profile: null,
      message: 'Ocorreu um problema ao processar os dados do usuário.',
      error: true,
    };
  }
}

export async function getUserByEmailHash(userEmail: string): Promise<UserDataResult> {
  try {
    const getEmailHash = await hashEmail(userEmail);
    const user = await prisma.user.findUnique({
      where: { emailHash: getEmailHash },
      include: {
        portfolio: true,
        courses: true,
        experiences: {
          include: {
            jobs: true, // ✅ Inclui os jobs dentro de cada experience
          },
        },
        graduation: true,
        // Se quiser incluir mais:
      },
    });

    if (!user)
      return {
        profile: null,
        message: 'Currículo ainda não cadastrado.',
        error: true,
      };

    const { id, emailHash, phoneEncrypted, emailEncrypted, ...dataUser } = user;

    const email = emailEncrypted ? await decryptData(emailEncrypted) : '';
    const phone = phoneEncrypted ? await decryptData(phoneEncrypted) : '';

    return {
      profile: {
        ...dataUser,
        email: email || '',
        phone: phone || '',
        image: dataUser.image === null ? undefined : dataUser.image,
        bio: dataUser.bio === null ? undefined : dataUser.bio,
        pickColor: dataUser.pickColor || 5,
        profession: dataUser.profession || '',
        city: dataUser.city || '',
        showPhoneInPDF: dataUser.showPhoneInPDF || false,
        showEmailInPDF: dataUser.showEmailInPDF || false,
        public: dataUser.public || false,
        template: dataUser.template || 'modern',
      },
      message: '',
      error: false,
    };
  } catch (error) {
    console.error('Ocorreu um problema ao acessar o banco de dados: ', error);
    return {
      profile: null,
      message: 'Ocorreu um problema ao acessar o banco de dados.',
      error: true,
    };
  }
}

/**
 * Creates or updates a user in the database.
 *
 * @param {DataCreateCurriculoForm} data - The data for creating or updating the user.
 * @returns {Promise<UserDataResult>} - The result of the user creation or update.
 * @throws Will throw an error if the user data or email is not provided.
 */
export async function createOrUpdateUser(
  data: DataCreateCurriculoForm,
  profile?: DataCreateCurriculoForm
): Promise<UserDataResult> {
  if (!data) {
    throw new Error('Dados do usuário são obrigatórios');
  }

  try {
    const { email, phone, ...dataRest } = data;
    const username = dataRest.username || '';

    if (!email) throw new Error('Email é obrigatório');

    const emailHash = await hashEmail(email || '');
    const emailEncrypted = await encryptData(email || '');
    const phoneEncrypted = await encryptData(phone || '');

    const existing = await prisma.user.findUnique({ where: { emailHash } });
    const existsUsername = await prisma.user.findUnique({ where: { username: username || '' } });

    if (existsUsername && existing?.emailHash !== existsUsername.emailHash) {
      throw new Error('Username já está em uso. Por favor, escolha outro.');
    }

    const result = existing
      ? await updateUser(existing.id, dataRest, emailEncrypted, phoneEncrypted, profile || null)
      : await createUser(dataRest, emailHash, emailEncrypted, phoneEncrypted);
    return result;
  } catch (error) {
    return {
      profile: null,
      message: `Ocorreu um problema ao salvar seu currículo. ${
        error instanceof Error ? error.message : 'Erro desconhecido'
      }`,
      error: true,
    };
  }
}
