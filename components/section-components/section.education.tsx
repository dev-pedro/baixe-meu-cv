'use server';
import { Graduation, SectionProps } from '@/app/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaGraduationCap } from 'react-icons/fa6';

export default async function Education({ props }: { props: SectionProps }) {
  const { profile } = await props;
  return (
    <section id="graduation" className="scroll-mt-20">
      {profile?.graduation && profile?.graduation?.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center mb-4">
            <FaGraduationCap className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">Formação</h2>
          </div>
          <div
            className={`grid gap-4 ${
              profile?.graduation.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-1 md:grid-cols-2'
            }`}
          >
            {profile?.graduation.map((g: Graduation, index: number) => (
              <Card key={index} className="min-h-full flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {'institution' in g && g?.institution}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground/60">
                      {'name' in g && g?.name} — {'year' in g && g?.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {'description' in g && g?.description}
                    </p>
                  </CardContent>
                </div>
                {'description' in g && g?.description && (
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger className="text-sm underline text-primary/50 hover:text-primary">
                        Mostrar mais
                      </DialogTrigger>
                      <DialogContent className="w-full lg:max-w-4xl h-auto -mt-20 rounded-xl">
                        <DialogHeader>
                          <DialogTitle className="sm:text-lg pt-4">
                            {g?.name} — {g?.year}
                          </DialogTitle>
                          <DialogDescription>
                            <div className="mt-2 sm:text-lg text-muted-foreground text-pretty">
                              {g?.description || 'Descrição não disponível.'}
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
