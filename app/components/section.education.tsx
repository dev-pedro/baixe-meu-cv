import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Education({
  props,
}: {
  props: any;
}) {
  return (
    <section className="mb-8">
      

      {props?.formacoes?.length > 0 && (
        <section className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Formações</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                    <p className="text-muted-foreground line-clamp-4">{formacao?.descricao}</p>
                  </CardContent>
                </div>
                <CardFooter>
                  {/* <Button variant="outline" size="sm">
                    Mostrar mais
                  </Button> */}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
