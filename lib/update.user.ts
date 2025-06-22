import { DataCreateCurriculoForm } from '@/app/types/types';
import {
  updateCoursesTx,
  updateExperiencesAndJobsTx,
  updateGraduationsTx,
  updatePortfolioEntriesTx,
} from './updateUser.helpers';
import { prisma } from './prisma';
import { formatUserResponse } from './format.user.response';

export async function updateUser(
  userId: number,
  data: DataCreateCurriculoForm,
  emailEncrypted: string,
  phoneEncrypted: string
) {
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

  const ops = [
    ...(await updatePortfolioEntriesTx(user.id, portfolio)),
    ...(await updateGraduationsTx(user.id, graduation)),
    ...(await updateCoursesTx(user.id, courses)),
    ...(await updateExperiencesAndJobsTx(user.id, experiences)),
  ];

  await prisma.$transaction(ops);

  return formatUserResponse(user.emailHash, true);
}
