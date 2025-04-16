import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImBooks } from 'react-icons/im';
import { LuSchool } from 'react-icons/lu';
import { TbWorldWww } from 'react-icons/tb';

export default function Courses({ props }: { props: any }) {
  console.log(props)
  return (
    <section className="mb-8">
      {props?.courses?.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center mb-4">
            <ImBooks className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">Cursos</h2>
          </div>
          <div
            className={`grid gap-4 ${
              props.courses.length > 1 ? 'sm:grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {props.courses.map((curso: any, index: number) => {
              const Icon = curso.online ? TbWorldWww : LuSchool;
              return (
                <Card key={index} className="min-h-full flex flex-col justify-between">
                  <div>
                    <CardHeader className="flex flex-row items-start gap-4">
                      <Icon className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <CardTitle className="text-lg">{curso?.curso}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground/60">
                          {curso?.instituicao} — {curso?.ano}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-1">
                        {curso?.descricao}
                      </p>
                    </CardContent>
                  </div>
                  {curso?.descricao && (
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger className="text-sm underline text-primary/50 hover:text-primary">
                          Mostrar mais
                        </DialogTrigger>
                        <DialogContent className="!max-w-2xl w-full">
                          <DialogHeader>
                            <DialogTitle>
                              {curso?.curso} — {curso?.ano}
                            </DialogTitle>
                            <DialogDescription asChild>
                              <div className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                                {curso?.descricao}
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}
