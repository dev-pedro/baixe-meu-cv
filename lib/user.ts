// lib/user.ts
'use server';
import { prisma } from '@/lib/prisma';
import { hashEmail } from '@/utils/hash.email';
import { encryptData } from '@/utils/encrypt.data';
import { DataCreateCurriculoForm, Portfolio, UserDataResult } from '@/app/types/types';
import { User } from './generated/prisma';
import { decryptData } from '@/utils/decrypt.data';

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

    return { profile: { email, ...profile }, message: '', error: false };
  } catch (error: any) {
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
    console.log('getEmailHash', getEmailHash);
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
    console.log('user', user);

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
      profile: { ...dataUser, email, phone },
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
export async function createOrUpdateUser(data: DataCreateCurriculoForm): Promise<UserDataResult> {
  //const LOCAL_STORAGE_KEY = 'curriculoPendentes';

  if (!data) {
    throw new Error('Dados do usuário são obrigatórios');
  }

  try {
    const { email, phone, portfolio, graduation, username, ...rest } = data;

    if (!email) throw new Error('Email é obrigatório');

    const getEmailHash = await hashEmail(email);
    const getEmailEncrypted = await encryptData(email);
    const getEhoneEncrypted = await encryptData(phone || '');
    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { emailHash: getEmailHash },
    });

    const existsUsername = await prisma.user.findUnique({
      where: { username: username || '' },
    });

    // TODO: Implementar validação de username com usuários diferentes colocando mesmo emailHash
    if (existsUsername && existing?.emailHash !== existsUsername.emailHash) {
      throw new Error('Username já está em uso. Por favor, escolha outro.');
    }

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
            set: username || '',
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
          data: portfolio.map((p) => {
            // Remove id if it's null or undefined
            const { id, ...rest } = p;
            return {
              ...rest,
              userId: user.id,
              tags: p && 'tags' in p && Array.isArray(p.tags) ? p.tags : [],
              customTags:
                p && 'customTags' in p && Array.isArray(p.customTags)
                  ? p.customTags
                  : p && 'customTags' in p && typeof p.customTags === 'string'
                  ? (p.customTags as string).split(',')
                  : [],
              category: p && 'category' in p && p.category ? p.category : null,
            };
          }),
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
        include: {
          portfolio: true,
          graduation: true,
          experiences: true,
        },
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
                  customTags:
                    p && 'customTags' in p && Array.isArray(p.customTags)
                      ? p.customTags
                      : p && 'customTags' in p && typeof p.customTags === 'string'
                      ? (p.customTags as string).split(',')
                      : [],
                  category: p && 'category' in p && p.category ? p.category : null,
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
                  online:
                    g && 'online' in g && g.online !== null && g.online !== undefined
                      ? g.online
                      : false,
                }))
              : [],
          },
          experiences: {
            create: Array.isArray(data.experiences)
              ? data.experiences.map((e) => ({
                  company: e && 'company' in e ? e.company : '',
                  start: e && 'start' in e ? e.start : '',
                  end: e && 'end' in e ? e.end : '',
                  jobs: {
                    create:
                      'jobs' in e && Array.isArray(e.jobs)
                        ? e.jobs.map((j) => ({
                            function: j && 'function' in j ? j.function : '',
                            description: j && 'description' in j ? j.description : '',
                            start: j && 'start' in j ? j.start : '',
                            end: j && 'end' in j ? j.end : '',
                          }))
                        : [],
                  },
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
          username: username || '',
          skills: rest.skills || [],
          softSkills: rest.softSkills || [],
        },
      });
    }

    // Busca novamente o usuário com os dados atualizados
    const updatedUser = await prisma.user.findUnique({
      where: { emailHash: getEmailHash },
      include: {
        portfolio: true,
        courses: true,
        experiences: true,
        graduation: true,
      },
    });

    if (!updatedUser) {
      throw new Error('Erro ao buscar usuário atualizado.');
    }

    const {
      id,
      emailHash: _,
      emailEncrypted: encryptedEmail,
      phoneEncrypted: encryptedPhone,
      ...updatedUserData
    } = updatedUser;

    const emailDecrypted = encryptedEmail ? await decryptData(encryptedEmail) : '';
    const phoneDecrypted = encryptedPhone ? await decryptData(encryptedPhone) : '';

    // Map portfolio, graduation, experiences, and courses to ensure correct types
    const mappedPortfolio = Array.isArray(updatedUserData.portfolio)
      ? updatedUserData.portfolio.map((p) => ({
          ...p,
          name: p.name ?? undefined,
          description: p.description ?? undefined,
          url: p.url ?? undefined,
          category: p.category ?? undefined,
          customCategory: p.customCategory ?? undefined,
        }))
      : undefined;

    const mappedGraduation = Array.isArray(updatedUserData.graduation)
      ? updatedUserData.graduation.map((g) => ({
          ...g,
          institution: g.institution ?? undefined,
          name: g.name ?? undefined,
          year: g.year ?? undefined,
          description: g.description ?? undefined,
          online: g.online ?? undefined,
        }))
      : undefined;

    const mappedExperiences = Array.isArray(updatedUserData.experiences)
      ? updatedUserData.experiences.map((e) => ({
          ...e,
          company: e.company ?? undefined,
          start: e.start ?? undefined,
          end: e.end ?? undefined,
        }))
      : undefined;

    const mappedCourses = Array.isArray(updatedUserData.courses)
      ? updatedUserData.courses.map((c) => ({
          ...c,
          institution: c.institution ?? undefined,
          name: c.name ?? undefined,
          year: c.year ?? undefined,
          description: c.description ?? undefined,
          online: c.online ?? undefined,
        }))
      : undefined;

    return {
      profile: {
        ...updatedUserData,
        email: emailDecrypted,
        phone: phoneDecrypted,
        portfolio: mappedPortfolio,
        graduation: mappedGraduation,
        experiences: mappedExperiences,
        courses: mappedCourses,
      },
      message: existing
        ? `${updatedUser.name}. Seus dados foram atualizados com sucesso!`
        : `Bem-vindo, ${updatedUser.name}. Seu usuário foi criado com sucesso!`,
      error: false,
    };
  } catch (error) {
    console.error('Erro ao criar ou atualizar usuário:', error);
    return {
      profile: null,
      message: `Ocorreu um problema ao salvar seu currícluo. ${
        error instanceof Error ? error.message : 'Erro desconhecido'
      }`,
      error: true,
    };
  }
}
