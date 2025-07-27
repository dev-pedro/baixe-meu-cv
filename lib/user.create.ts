import { DataCreateCurriculoForm, Job, UserDataResult } from '@/app/types/types';
import { formatUserResponse } from './format.user.response';
import { prisma } from './prisma';

export async function createUser(
  data: DataCreateCurriculoForm,
  emailHash: string,
  emailEncrypted: string,
  phoneEncrypted: string
): Promise<UserDataResult> {
  const { email, phone, portfolio, graduation, experiences, courses, username, ...rest } = data;

  const user = await prisma.user.create({
    include: {
      portfolio: true,
      graduation: true,
      experiences: true,
      courses: true,
    },
    data: {
      ...rest,
      emailHash,
      emailEncrypted,
      phoneEncrypted,
      name: rest.name || '',
      username: username || '',
      skills: rest.skills || [],
      softSkills: rest.softSkills || [],
      portfolio: {
        create: Array.isArray(portfolio)
          ? portfolio.map((p) => ({
              name: p.name || '',
              url: p.url || '',
              description: p.description || '',
              customTags:
                typeof p.customTags === 'string' ? p.customTags.split(',') : p.customTags || [],
              category: p.category || null,
            }))
          : [],
      },
      graduation: {
        create: Array.isArray(graduation)
          ? graduation.map((g) => ({
              institution: g.institution || '',
              name: g.name || '',
              year: g.year || '',
              description: g.description || '',
              online: g.online ?? false,
            }))
          : [],
      },
      experiences: {
        create: Array.isArray(experiences)
          ? experiences.map((e) => ({
              company: e.company || '',
              start: e.start || '',
              end: e.end || '',
              jobs: {
                create: Array.isArray(e.jobs)
                  ? e.jobs.map((j: Job) => ({
                      function: ('function' in j && j.function) || '',
                      description: ('description' in j && j.description) || '',
                      start: ('start' in j && j.start) || '',
                      end: ('end' in j && j.end) || '',
                    }))
                  : [],
              },
            }))
          : [],
      },
      courses: {
        create: Array.isArray(courses)
          ? courses.map((c) => ({
              institution: c.institution || '',
              name: c.name || '',
              year: c.year || '',
              description: c.description || '',
              online: c.online ?? false,
            }))
          : [],
      },
    },
  });

  return formatUserResponse(user.emailHash, false);
}
