import { DataCreateCurriculoForm, UserDataResult } from '@/app/types/types';
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
  data: DataCreateCurriculoForm,
  emailEncrypted: string,
  phoneEncrypted: string,
  profile: DataCreateCurriculoForm
): Promise<UserDataResult> {
  const { email, phone, portfolio, graduation, experiences, courses, username, ...rest } = data;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...rest,
      name: rest.name || '',
      emailEncrypted,
      phoneEncrypted,
      username: { set: username || '' },
      skills: { set: rest.skills || [] },
      softSkills: { set: rest.softSkills || [] },
    },
  });

  const ops = [];

  // Comparar e aplicar apenas se diferentes
  if (!isEqual(profile?.portfolio, portfolio)) {
    ops.push(...(await updatePortfolioEntriesTx(user.id, portfolio)));
  }

  if (!isEqual(profile?.graduation, graduation)) {
    ops.push(...(await updateGraduationsTx(user.id, graduation)));
  }
  if (!isEqual(profile?.courses, courses)) {
    ops.push(...(await updateCoursesTx(user.id, courses)));
  }

  if (!isEqual(profile?.experiences, experiences)) {
    ops.push(...(await updateExperiencesAndJobsTx(user.id, experiences)));
  }

  if (ops.length > 0) {
    await prisma.$transaction(ops);
  }

  return formatUserResponse(user.emailHash, true);
}
