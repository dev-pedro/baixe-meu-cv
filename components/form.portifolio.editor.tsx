'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Portfolio } from '@/app/types/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PortfolioCategory, PortfolioTag } from '@/lib/generated/prisma';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { getPickerBg } from '@/utils/colors';
import { useState } from 'react';
import { PortfolioSchema } from '@/app/lib/schemas/form.perfil.editor.schema';

interface Props {
  projects: Portfolio[];
  setProjects: (projects: Portfolio[]) => void;
  pickColor: number;
}

export default function PortfolioEditor({ projects, setProjects, pickColor }: Props) {
  const [urlError, setUrlError] = useState<string | null>(null);
  const { bg } = getPickerBg(pickColor);
  const handleChange = <K extends keyof Portfolio>(
    index: number,
    field: K,
    value: Portfolio[K]
  ) => {
    const updated = [...projects];
    if (updated[index]) {
      updated[index][field] = value;
    }
    setProjects(updated);
  };

  const handleAdd = () => {
    setProjects([
      ...projects,
      {
        name: '',
        url: '',
        description: '',
        tags: [],
        customTags: [],
        category: '',
        customCategory: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  // Validação correta de URL
  const handleUrlBlur = (project: Portfolio) => {
    const result = PortfolioSchema.pick({ url: true }).safeParse({ url: project?.url });

  if (!result.success) {
    setUrlError(result.error.format().url?._errors?.[0] || 'URL');
    }
  };

  // Atualiza o estado da URL
  const handleUrlChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlError(null); // Limpa o erro ao digitar
    handleChange(index, 'url', e.target.value);
  };

  return (
    <div className="pt-2 space-y-4 border-t">
      <h2 className="text-lg font-semibold">Portfólio</h2>

      <Accordion type="multiple" className="space-y-2">
        {projects &&
          projects.map((project, index) => {
            const isCustomTagEnabled = Array.from(('tags' in project && project?.tags) || []).some(
              (tag) => tag === 'OUTRA'
            );
            const isCustomCategoryEnabled = 'category' in project && project?.category === 'OUTRA';

            return (
              <AccordionItem key={index} value={`project-${index}`}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pr-4">
                    <div className="w-full">
                      <AccordionTrigger className="cursor-pointer">
                        <CardTitle>
                          {('name' in project && project?.name) || `Projeto ${index + 1}`}
                        </CardTitle>
                      </AccordionTrigger>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemove(index)}
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </CardHeader>
                  <AccordionContent>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-lg" htmlFor={`name-${index}`}>
                          Nome do Projeto
                        </Label>
                        <Input
                          id={`name-${index}`}
                          value={('name' in project && project?.name) || ''}
                          onChange={(e) => handleChange(index, 'name', e.target.value)}
                          placeholder="Ex: Projeto de ..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-lg" htmlFor={`url-${index}`}>
                          URL do Projeto
                        </Label>
                        <Input
                          id={`url-${index}`}
                          value={('url' in project && project.url) || ''}
                          aria-invalid={!!urlError}
                          className={urlError ? 'border-2 border-red-500' : ''}
                          onBlur={() => handleUrlBlur(project)}
                          onChange={(e) => handleUrlChange(index, e)}
                          placeholder="https://exemplo.com/.br"
                        />
                        {urlError && <p className="text-sm text-red-500">{urlError}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-lg" htmlFor={`description-${index}`}>
                          Descrição
                        </Label>
                        <Textarea
                          id={`description-${index}`}
                          value={('description' in project && project.description) || ''}
                          onChange={(e) => handleChange(index, 'description', e.target.value)}
                          placeholder="Breve descrição do projeto..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-lg">Selecione as Habilidades</Label>
                        <ToggleGroup
                          type="multiple"
                          value={('tags' in project && project.tags) || []}
                          onValueChange={(value: string[]) =>
                            handleChange(index, 'tags', value as PortfolioTag[])
                          }
                          className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                        >
                          {Object.values(PortfolioTag).map((tag) => {
                            const dataStateBg = `data-[state=on]:${bg}`;
                            return (
                              <ToggleGroupItem
                                variant={'custom'}
                                key={tag}
                                value={tag}
                                aria-label={tag}
                                className={`text-nowrap ${dataStateBg}`}
                              >
                                {tag}
                              </ToggleGroupItem>
                            );
                          })}
                        </ToggleGroup>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-lg" htmlFor={`customTags-${index}`}>
                          Outras Habilidades (separadas por vírgula)
                        </Label>
                        <Input
                          id={`customTags-${index}`}
                          value={('customTags' in project && project.customTags?.join(', ')) || ''}
                          onChange={(e) =>
                            handleChange(
                              index,
                              'customTags',
                              e.target.value
                                .toUpperCase()
                                .split(',')
                                .map((t) => t.trim())
                            )
                          }
                          placeholder="Ex: NODE.JS, REACT, NEXT.JS"
                          disabled={!isCustomTagEnabled}
                        />
                      </div>

                      <div className="flex flex-col w-full gap-2 sm:flex-row">
                        <div className="flex flex-col space-y-2">
                          <Label className="text-lg">Categoria</Label>
                          <Select
                            value={('category' in project && project.category) || ''}
                            onValueChange={(value) =>
                              handleChange(index, 'category', value as PortfolioCategory)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(PortfolioCategory).map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex-1 space-y-2">
                          <Label className="text-lg" htmlFor={`customCategory-${index}`}>
                            Categoria Personalizada - Opcional (selecione OUTRA em Categoria)
                          </Label>
                          <Input
                            id={`customCategory-${index}`}
                            value={('customCategory' in project && project.customCategory) || ''}
                            onChange={(e) =>
                              handleChange(index, 'customCategory', e.target.value.toUpperCase())
                            }
                            placeholder="Ex: DESIGNER DE INTERIORES"
                            disabled={!isCustomCategoryEnabled}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            );
          })}
      </Accordion>

      <Button type="button" variant="outline" onClick={handleAdd}>
        Adicionar Projeto
      </Button>
    </div>
  );
}
