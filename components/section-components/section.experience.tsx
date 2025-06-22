'use server';
import { Experience, Job, SectionProps } from '@/app/types/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MdFactory } from 'react-icons/md';
export default async function SectionExperience({ props }: { props: SectionProps }) {
  const { profile } = await props;
  return (
    <section id="experience" className="scroll-mt-20">
      {profile && Array.isArray(profile.experiences) && profile.experiences.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center mb-4">
            <MdFactory className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">Experiências</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {profile?.experiences &&
              profile?.experiences?.length > 0 &&
              (profile.experiences as Experience[])
                .sort(
                  (a: Experience, b: Experience) =>
                    parseInt(('start' in b && b?.start) as string) -
                    parseInt(('start' in a && a?.start) as string)
                ) // Ordena por fim desc
                .map((empresa, empresaIndex: number) => (
                  <AccordionItem key={empresaIndex} value={`empresa-${empresaIndex}`}>
                    <AccordionTrigger className="hover:no-underline hover:bg-primary/10 p-2 rounded-xl cursor-pointer">
                      <div className="text-left flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2">
                        <span className="text-lg md:text-xl font-medium no-underline">
                          {'company' in empresa && empresa?.company}
                        </span>
                        <span className="hidden md:block text-lg md:text-xl">|</span>
                        <span className="font-bold">
                          {'start' in empresa && empresa.start} a {'end' in empresa && empresa.end}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-4 pt-3">
                        {'jobs' in empresa &&
                          empresa.jobs &&
                          empresa.jobs.length > 0 &&
                          empresa.jobs
                            .sort(
                              (a: Job, b: Job) =>
                                parseInt(('start' in a && a.start) as string) -
                                parseInt(('start' in b && b.start) as string)
                            ) // Ordena os jobs por fim asc
                            .map((job: Job, jobIndex: number) => (
                              <li key={jobIndex} className="border-l-4 border-primary/50 pl-4">
                                <p className="text-sm font-semibold">
                                  {'function' in job && job.function}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {'start' in job && job.start} – {'end' in job && job.end}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {'description' in job && job.description}
                                </p>
                              </li>
                            ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
          </Accordion>
        </div>
      )}
    </section>
  );
}
