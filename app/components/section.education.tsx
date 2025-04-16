import { Button } from '@/components/ui/button';
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

export default function Education({ props }: { props: any }) {
  return (
    <section className="mb-8">
      {props?.formacoes?.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center mb-4">
            <FaGraduationCap className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">Formação</h2>
          </div>
          <div
            className={`grid gap-4 ${
              props.formacoes.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-1 md:grid-cols-2'
            }`}
          >
            {props.formacoes.map((formacao: any, index: number) => (
              <Card key={index} className="min-h-full flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle className="text-lg">{formacao?.instituicao}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground/60">
                      {formacao?.curso} — {formacao?.ano}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{formacao?.descricao}</p>
                  </CardContent>
                </div>
                {formacao?.descricao && (
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger className="text-sm underline text-primary/50 hover:text-primary">
                        Mostrar mais
                      </DialogTrigger>
                      <DialogContent className="w-full lg:max-w-4xl h-auto -mt-20">
                        <DialogHeader>
                          <DialogTitle className="sm:text-lg pt-4">
                            {formacao?.curso} — {formacao?.ano}
                          </DialogTitle>
                          <DialogDescription>
                            <div className="mt-2 sm:text-lg text-muted-foreground text-pretty">
                              {formacao?.descricao}
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
