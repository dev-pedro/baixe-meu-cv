import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MdFactory } from 'react-icons/md';

export default function Experience({ props }: { props: any }) {
  return (
    <section className="mb-8">
      {props?.experiences?.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center mb-4">
            <MdFactory className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">Experiências</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {props?.experiences
              .sort((a: any, b: any) => parseInt(b.inicio) - parseInt(a.inicio)) // Ordena por fim desc
              .map((empresaObj: any, empresaIndex: number) => (
                <AccordionItem key={empresaIndex} value={`empresa-${empresaIndex}`}>
                  <AccordionTrigger className="hover:no-underline hover:bg-primary/10 p-2 rounded-xl cursor-pointer">
                    <div className="text-left flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2">
                      <span className="text-lg md:text-xl font-medium no-underline">
                        {empresaObj.empresa}
                      </span>
                      <span className="hidden md:block text-lg md:text-xl">|</span>
                      <span className="font-bold">
                        {empresaObj.inicio} a {empresaObj.fim}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-4 pt-3">
                      {empresaObj.jobs
                        .sort((a: any, b: any) => parseInt(a.inicio) - parseInt(b.inicio)) // Ordena os jobs por fim asc
                        .map((job: any, jobIndex: number) => (
                          <li key={jobIndex} className="border-l-4 border-primary/50 pl-4">
                            <p className="text-sm font-semibold">{job.cargo}</p>
                            <p className="text-xs text-muted-foreground">
                              {job.inicio} – {job.fim}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{job.descricao}</p>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </section>
      )}
    </section>
  );
}
