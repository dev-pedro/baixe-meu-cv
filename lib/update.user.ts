import {
  Course,
  DataCreateCurriculoForm,
  DataCreateOrUpdateUser,
  Experience,
  Graduation,
  Job,
  Portfolio,
  UserDataResult,
} from '@/app/types/types';
import {
  updateCoursesTx,
  updateExperiencesAndJobsTx,
  updateGraduationsTx,
  updatePortfolioEntriesTx,
} from './updateUser.helpers';
import { prisma } from './prisma';
import { formatUserResponse } from './format.user.response';
import isEqual from 'lodash.isequal';

export async function updateUser(
  userId: number,
  data: DataCreateOrUpdateUser,
  emailEncrypted: string,
  phoneEncrypted: string,
  profile: DataCreateCurriculoForm
): Promise<UserDataResult> {
  const { courses, portfolio, experiences, graduation, ...rest } = data;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...rest,
      name: rest.name || '',
      emailEncrypted,
      phoneEncrypted,
      username: { set: rest.username || '' },
      skills: { set: rest.skills || [] },
      softSkills: { set: rest.softSkills || [] },
    },
  });

  const ops = [];

  // Comparar e aplicar apenas se diferentes
  if (!isEqual(profile?.portfolio, portfolio)) {
    const normalizedPortfolio = (portfolio || []).map((p: Portfolio) => ({
      ...p,
      id: p.id ?? 0,
      userId: p.userId ?? user.id,
      description: p.description ?? null,
      category: p.category ?? null,
      url: p.url ?? null,
      name: p.name ?? null,
      tags: Array.isArray(p.tags) ? p.tags : [],
      customTags: Array.isArray(p.customTags) ? p.customTags : [],
      customCategory: p.customCategory ?? null,
    }));
    ops.push(...(await updatePortfolioEntriesTx(user.id, normalizedPortfolio)));
  }

  if (!isEqual(profile?.graduation, graduation)) {
    const normalizedGraduation = (graduation || []).map((g: Graduation) => ({
      ...g,
      id: g.id ?? 0,
      userId: g.userId ?? user.id,
      institution: g.institution ?? null,
      name: g.name ?? null,
      year: g.year ?? null,
      description: g.description ?? null,
      online: g.online ?? false,
    }));
    ops.push(...(await updateGraduationsTx(user.id, normalizedGraduation)));
  }
  if (!isEqual(profile?.courses, courses)) {
    const normalizedCourses = (courses || []).map((c: Course) => ({
      ...c,
      id: c.id ?? 0,
      userId: c.userId ?? user.id,
      institution: c.institution ?? null,
      name: c.name ?? null,
      year: c.year ?? null,
      description: c.description ?? null,
      online: c.online ?? false,
    }));
    ops.push(...(await updateCoursesTx(user.id, normalizedCourses)));
  }

  if (!isEqual(profile?.experiences, experiences)) {
    const normalizedExperiences = (experiences || []).map((e: Experience) => ({
      ...e,
      id: e.id ?? 0,
      userId: e.userId ?? user.id,
      company: e.company ?? null,
      start: e.start ?? null,
      end: e.end ?? null,
      jobs: (e.jobs || []).map((j: Job) => ({
        ...j,
        id: j.id ?? 0,
        experienceId: e.id ?? 0,
        function: j.function ?? null,
        description: j.description ?? null,
        start: j.start ?? null,
        end: j.end ?? null,
      })),
    }));
    ops.push(...(await updateExperiencesAndJobsTx(user.id, normalizedExperiences)));
  }

  if (ops.length > 0) {
    await prisma.$transaction(ops);
  }

  return formatUserResponse(user.emailHash, true);
}
