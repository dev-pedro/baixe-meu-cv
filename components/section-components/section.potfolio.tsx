'use server';

import Link from 'next/link';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { getPickerBg } from '@/utils/colors';
import { DataCreateCurriculoForm, SectionProps } from '@/app/types/types';

export default async function Portifolio({ props }: { props: SectionProps }) {
  const { profile } = await props;
  console.log('Portifolio', profile?.portfolio);
  const { bg } = getPickerBg(profile?.pickColor || 1);
  return (
    <section id="portfolio" className="mt-20 sm:mt-36">
      {profile?.portfolio && profile?.portfolio?.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center mb-4">
            <FolderGit2 className="w-8 h-8 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold">Portfólio</h2>
          </div>

          <div
            className={`grid gap-4 ${
              profile.portfolio.length > 1 ? 'sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {profile.portfolio.map((projeto: any, index: number) => (
              <Card key={index} className="flex flex-col justify-between rounded-xl">
                <CardContent className="p-4">
                  <Link
                    href={projeto.url}
                    target="_blank"
                    className="text-lg font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {projeto?.name || 'Nome do Projeto não definido.'} <ExternalLink size={16} />
                  </Link>

                  <p className="text-sm text-muted-foreground mt-1 line-clamp-4">
                    {projeto?.description || 'Descrição não disponível.'}
                  </p>

                  {projeto?.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {projeto.tags.map((tech: string, i: number) => (
                        <Badge key={i} variant={'outline'} className={`${bg} text-sm`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {projeto?.customTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {projeto.customTags.map((tech: string, i: number) => (
                        <Badge key={i} variant={'outline'} className={`${bg} text-sm`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>

                <div className="p-4 pt-0">
                  <Button asChild variant="download" className="w-full rounded-xl">
                    <Link href={projeto.url} target="_blank">
                      Ver projeto
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
