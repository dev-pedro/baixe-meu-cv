import { prisma } from './prisma';
import { Course, Experience, Graduation, Job, Portfolio } from './generated/prisma';

export async function updatePortfolioEntriesTx(userId: number, portfolio?: Portfolio[]) {
  const existing = await prisma.portfolio.findMany({ where: { userId }, select: { id: true } });
  const incoming = portfolio || [];

  const incomingIds = new Set(incoming.filter((p) => p.id).map((p) => p.id));
  const toDelete = existing.filter((p) => !incomingIds.has(p.id)).map((p) => p.id);

  const operations = [];

  if (toDelete.length) {
    operations.push(prisma.portfolio.deleteMany({ where: { id: { in: toDelete } } }));
  }

  for (const p of incoming) {
    const data = {
      name: p.name || '',
      url: p.url || '',
      description: p.description || '',
      tags: Array.isArray(p.tags) ? p.tags : [],
      customTags: Array.isArray(p?.customTags) ? p.customTags : [],
      category: p.category || null,
      userId,
    };

    if (p.id) {
      operations.push(
        prisma.portfolio.upsert({
          where: { id: p.id },
          update: data,
          create: data,
        })
      );
    } else {
      operations.push(prisma.portfolio.create({ data }));
    }
  }

  return operations;
}

export async function updateGraduationsTx(userId: number, graduation?: Graduation[]) {
  const existing = await prisma.graduation.findMany({ where: { userId }, select: { id: true } });
  const incoming = graduation || [];

  const incomingIds = new Set(incoming.filter((g) => g.id).map((g) => g.id));
  const toDelete = existing.filter((g) => !incomingIds.has(g.id)).map((g) => g.id);

  const operations = [];

  if (toDelete.length) {
    operations.push(prisma.graduation.deleteMany({ where: { id: { in: toDelete } } }));
  }

  for (const g of incoming) {
    const data = {
      institution: ('institution' in g && g.institution) || '',
      name: ('name' in g && g.name) || '',
      year: ('year' in g && g.year) || '',
      description: ('description' in g && g.description) || '',
      userId,
    };

    if (g.id) {
      operations.push(
        prisma.graduation.upsert({
          where: { id: g.id },
          update: data,
          create: data,
        })
      );
    } else {
      operations.push(prisma.graduation.create({ data }));
    }
  }

  return operations;
}

export async function updateCoursesTx(userId: number, courses?: Course[]) {
  const existing = await prisma.course.findMany({ where: { userId }, select: { id: true } });
  const incoming = courses || [];
  console.log('Courses: ', courses);
  const incomingIds = new Set(incoming.filter((c) => c.id).map((c) => c.id));
  const toDelete = existing.filter((c) => !incomingIds.has(c.id)).map((c) => c.id);

  const operations = [];

  if (toDelete.length) {
    operations.push(prisma.course.deleteMany({ where: { id: { in: toDelete } } }));
  }

  for (const c of incoming) {
    const data = {
      institution: c.institution || '',
      name: c.name || '',
      year: c.year || '',
      description: c.description || '',
      online: c.online ?? false,
      userId,
    };

    if (c.id) {
      operations.push(
        prisma.course.upsert({
          where: { id: c.id },
          update: data,
          create: data,
        })
      );
    } else {
      operations.push(prisma.course.create({ data }));
    }
  }

  return operations;
}

export async function updateExperiencesAndJobsTx(
  userId: number,
  experiences?: (Experience & { jobs?: Job[] })[]
) {
  const existing = await prisma.experience.findMany({ where: { userId }, select: { id: true } });
  const incoming = experiences || [];

  console.log('teste: ', experiences && 'jobs' in experiences && experiences?.jobs);

  const incomingExperienceIds = new Set(incoming.filter((e) => e.id).map((e) => e.id));
  const toDeleteExperienceIds = existing
    .filter((e) => !incomingExperienceIds.has(e.id))
    .map((e) => e.id);

  const operations = [];

  if (toDeleteExperienceIds.length) {
    operations.push(
      prisma.job.deleteMany({ where: { experienceId: { in: toDeleteExperienceIds } } })
    );
    operations.push(prisma.experience.deleteMany({ where: { id: { in: toDeleteExperienceIds } } }));
  }

  for (const e of incoming) {
    const experienceData = {
      company: e.company || '',
      start: e.start || '',
      end: e.end || '',
      userId,
    };

    let experienceId = e.id;

    if (e.id) {
      operations.push(prisma.experience.update({ where: { id: e.id }, data: experienceData }));
    } else {
      const newExperience = await prisma.experience.create({ data: experienceData });
      experienceId = newExperience.id;
    }

    const existingJobs = await prisma.job.findMany({
      where: { experienceId },
      select: { id: true },
    });

    const incomingJobs = e.jobs || [];
    const incomingJobIds = new Set(incomingJobs.filter((j: Job) => j.id).map((j) => j.id));
    const toDeleteJobIds = existingJobs.filter((j) => !incomingJobIds.has(j.id)).map((j) => j.id);

    if (toDeleteJobIds.length) {
      operations.push(prisma.job.deleteMany({ where: { id: { in: toDeleteJobIds } } }));
    }

    for (const j of incomingJobs) {
      const jobData = {
        function: j.function || '',
        description: j.description || '',
        start: j.start || '',
        end: j.end || '',
        experienceId,
      };

      if (j.id) {
        operations.push(
          prisma.job.upsert({
            where: { id: j.id },
            update: jobData,
            create: jobData,
          })
        );
      } else {
        operations.push(prisma.job.create({ data: jobData }));
      }
    }
  }

  return operations;
}
