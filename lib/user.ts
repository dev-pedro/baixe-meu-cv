// lib/user.ts
'use server';
import { prisma } from '@/lib/prisma';
import { hashEmail } from '@/utils/hash.email';
import { encryptData } from '@/utils/encrypt.data';
import { UserInput } from '@/app/types/types';

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

export async function getUserByEmailHash(email: string) {
  try {
    const emailHash = await hashEmail(email);
    const user = await prisma.user.findUnique({
      where: { emailHash },
      include: {
        portfolio: true,
        courses: true,
        experiences: true,
        graduation: true,
        // Se quiser incluir mais:
      },
    });

    if (!user) return null;

    const { id, ...rest } = user;
    console.log('usuário: ', rest);
    return {
      user: rest,
      message: 'Usuário encontrado com sucesso!',
      error: false,
    };
  } catch (error: any) {
    console.error('Ocorreu um problema ao acessar o banco de dados: ', error?.message);
    return {
      user: null,
      message: 'Ocorreu um problema ao acessar o banco de dados. Tente novamente mais tarde.',
      error: true,
    };
  }
}

export async function createOrUpdateUser(data: UserInput) {
  console.log('Dados do usuário:', data);

  try {
    const { email, phone, portfolio, graduation, ...rest } = data;

    if (!email) throw new Error('Email é obrigatório');

    const emailHash = await hashEmail(email);
    const emailEncrypted = await encryptData(email);
    const phoneEncrypted = await encryptData(phone || '');

    const existing = await prisma.user.findUnique({
      where: { emailHash },
      include: { portfolio: true },
    });

    let user: any;

    if (existing) {
      // Atualiza o usuário
      user = await prisma.user.update({
        where: { emailHash },
        data: {
          ...rest,
          emailEncrypted,
          phoneEncrypted,
          // Apaga portfólios antigos
          portfolio: {
            deleteMany: {},
          },
          graduation: {
            deleteMany: {},
          },
        },
      });

      // Recria os novos portfólios
      if (Array.isArray(portfolio)) {
        await prisma.portfolio.createMany({
          data: portfolio.map((p) => ({
            ...p,
            userId: user.id,
            technologies: Array.isArray(p.technologies)
              ? p.technologies
              : p.technologies.split(','),
          })),
        });
      }

      // Recria as novas formações
      if (Array.isArray(graduation)) {
        await prisma.graduation.createMany({
          data: graduation.map((g) => ({
            institution: g.institution,
            name: g.name,
            year: g.year,
            description: g.description,
            userId: user.id,
          })),
        });
      }
    } else {
      // Cria o usuário e portfólios juntos
      user = await prisma.user.create({
        data: {
          ...rest,
          emailHash,
          emailEncrypted,
          phoneEncrypted,
          portfolio: {
            create: Array.isArray(portfolio)
              ? portfolio.map((p) => ({
                  name: p.name,
                  url: p.url,
                  description: p.description,
                  technologies: Array.isArray(p.technologies)
                    ? p.technologies
                    : p.technologies.split(','),
                }))
              : [],
          },
          graduation: {
            create: Array.isArray(graduation)
              ? graduation.map((g) => ({
                  institution: g.institution,
                  name: g.name,
                  year: g.year,
                  description: g.description,
                }))
              : [],
          },
        },
      });
    }

    const { id, ...userWithoutId } = user;

    return {
      user: userWithoutId,
      message: existing
        ? `Olá, ${user.name}. Seus dados foram atualizados com sucesso!`
        : `Bem-vindo, ${user.name}. Seu usuário foi criado com sucesso!`,
      error: false,
    };
  } catch (error) {
    console.error('Erro ao criar ou atualizar usuário:', error);

    return {
      user: null,
      message: 'Ocorreu um problema ao processar os dados do usuário. Tente novamente mais tarde.',
      error: true,
    };
  }
}
