// lib/user.ts
'use server';
import { prisma } from '@/lib/prisma';
import { hashEmail } from '@/utils/hash.email';
import { encryptData } from '@/utils/encrypt.data';
import {
  DataCreateCurriculoForm,
  Portfolio,
  UserDataResult,
} from '@/app/types/types';
import { User } from './generated/prisma';
import { decryptData } from '@/utils/decrypt.data';

export async function getUserByUserName(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) return null;

    const { id, ...rest } = user;
    return rest;
  } catch (error) {
    console.error('Erro ao buscar usuário por username:', error);
    return {
      user: null,
      message: 'Ocorreu um problema ao processar os dados do usuário. Tente novamente mais tarde.',
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
        experiences: true,
        graduation: true,
        // Se quiser incluir mais:
      },
    });
    console.log('usuário: ', user);

    if (!user) return { profile: null, message: 'Nenhum usuário encontrado!', error: true };

    const { id, emailHash, phoneEncrypted, emailEncrypted, ...dataUser } = user;

    const email = emailEncrypted ? await decryptData(emailEncrypted) : '';
    const phone = phoneEncrypted ? await decryptData(phoneEncrypted) : '';

    return {
      profile: { ...dataUser, email, phone },
      message: '',
      error: false,
    };
  } catch (error: any) {
    console.error('Ocorreu um problema ao acessar o banco de dados: ', error?.message);
    return {
      profile: null,
      message: 'Ocorreu um problema ao acessar o banco de dados. Tente novamente mais tarde.',
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
export async function createOrUpdateUser(data: DataCreateCurriculoForm): Promise<UserDataResult> {
  console.log('Dados do usuário:', data);

  if (!data) {
    throw new Error('Dados do usuário são obrigatórios');
  }

  try {
    const { email, phone, portfolio, graduation, ...rest } = data;

    if (!email) throw new Error('Email é obrigatório');

    const getEmailHash = await hashEmail(email);
    const getEmailEncrypted = await encryptData(email);
    const getEhoneEncrypted = await encryptData(phone || '');

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { emailHash: getEmailHash },
      include: {
        portfolio: true,
        courses: true,
        experiences: true,
        graduation: true,
      },
    });

    let user: User;

    if (existing) {
      // Update existing user
      user = await prisma.user.update({
        where: { emailHash: getEmailHash },
        data: {
          ...rest,
          name: rest.name || '',
          emailEncrypted: getEmailEncrypted || '',
          phoneEncrypted: getEhoneEncrypted || '',
          portfolio: {
            deleteMany: {}, // Clear old portfolios
          },
          graduation: {
            deleteMany: {}, // Clear old graduations
          },
          username: {
            set: rest.username || '',
          },
          experiences: {
            deleteMany: {}, // Clear old experiences
          },
          courses: {
            deleteMany: {}, // Clear old courses
          },
          skills: {
            set: rest.skills || [],
          },
          softSkills: {
            set: rest.softSkills || [],
          },
        },
      });

      // Recreate new portfolios
      if (Array.isArray(portfolio)) {
        await prisma.portfolio.createMany({
          data: portfolio.map((p) => ({
            ...p,
            userId: user.id,
            technologies:
              p && 'technologies' in p && Array.isArray(p.technologies)
                ? p.technologies
                : p && 'technologies' in p && typeof p.technologies === 'string'
                ? (p.technologies as string).split(',')
                : [],
          })),
        });
      }

      // Recreate new graduations
      if (Array.isArray(graduation)) {
        await prisma.graduation.createMany({
          data: graduation.map((g) => ({
            institution: 'institution' in g ? g.institution : '',
            name: 'name' in g ? g.name : '',
            year: 'year' in g ? g.year : '',
            description: 'description' in g ? g.description : '',
            userId: user.id,
          })),
        });
      }

      // Recreate new experiences
      if (Array.isArray(data.experiences)) {
        await prisma.experience.createMany({
          data: data.experiences.map((e) => ({
            name: 'name' in e ? e.name : '',
            company: 'company' in e ? e.company : '',
            start: 'start' in e ? e.start : '',
            end: 'end' in e ? e.end : '',
            jobs: 'jobs' in e ? e.jobs : [],
            userId: user.id,
          })),
        });
      }

      // Recreate new courses
      if (Array.isArray(data.courses)) {
        await prisma.course.createMany({
          data: data.courses.map((c) => ({
            institution: 'institution' in c ? c.institution : '',
            name: 'name' in c ? c.name : '',
            year: 'year' in c ? c.year : '',
            description: 'description' in c ? c.description : '',
            online:
              c && 'online' in c && c.online !== null && c.online !== undefined ? c.online : false,
            userId: user.id,
          })),
        });
      }
    } else {
      // Create new user with related data
      user = await prisma.user.create({
        data: {
          ...rest,
          emailHash: getEmailHash,
          emailEncrypted: getEmailEncrypted,
          phoneEncrypted: getEhoneEncrypted,
          portfolio: {
            create: Array.isArray(portfolio)
              ? portfolio.map((p: Portfolio) => ({
                  name: p && 'name' in p ? p.name : '',
                  url: p && 'url' in p ? p.url : '',
                  description: p && 'description' in p ? p.description : '',
                  technologies:
                    p && 'technologies' in p && Array.isArray(p.technologies)
                      ? p.technologies
                      : p && 'technologies' in p && typeof p.technologies === 'string'
                      ? (p.technologies as string).split(',')
                      : [],
                }))
              : [],
          },
          graduation: {
            create: Array.isArray(graduation)
              ? graduation.map((g) => ({
                  institution: g && 'institution' in g ? g.institution : '',
                  name: g && 'name' in g ? g.name : '',
                  year: g && 'year' in g ? g.year : '',
                  description: g && 'description' in g ? g.description : '',
                }))
              : [],
          },
          experiences: {
            create: Array.isArray(data.experiences)
              ? data.experiences.map((e) => ({
                  name: e && 'name' in e ? e.name : '',
                  company: e && 'company' in e ? e.company : '',
                  start: e && 'start' in e ? e.start : '',
                  end: e && 'end' in e ? e.end : '',
                  jobs: 'jobs' in e ? e.jobs : [],
                }))
              : [],
          },
          courses: {
            create: Array.isArray(data.courses)
              ? data.courses.map((c) => ({
                  institution: c && 'institution' in c ? c.institution : '',
                  name: c && 'name' in c ? c.name : '',
                  year: c && 'year' in c ? c.year : '',
                  description: c && 'description' in c ? c.description : '',
                  online:
                    c && 'online' in c && c.online !== null && c.online !== undefined
                      ? c.online
                      : false,
                }))
              : [],
          },
          name: rest.name || '',
          username: rest.username || '',
          skills: rest.skills || [],
          softSkills: rest.softSkills || [],
        },
      });
    }

    const { id, emailHash, phoneEncrypted, emailEncrypted, ...userData } = user;

    return {
      profile: { email, phone, ...userData },
      message: existing
        ? `Olá, ${user.name}. Seus dados foram atualizados com sucesso!`
        : `Bem-vindo, ${user.name}. Seu usuário foi criado com sucesso!`,
      error: false,
    };
  } catch (error) {
    console.error('Erro ao criar ou atualizar usuário:', error);

    return {
      profile: null,
      message: 'Ocorreu um problema ao processar os dados do usuário. Tente novamente mais tarde.',
      error: true,
    };
  }
}
