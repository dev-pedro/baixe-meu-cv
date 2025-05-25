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

interface Props {
  projects: Portfolio[];
  setProjects: (projects: Portfolio[]) => void;
  pickColor: number;
}

export default function PortfolioEditor({ projects, setProjects, pickColor }: Props) {
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

  return (
    <div className="pt-2 space-y-4 border-t">
      <h2 className="text-lg font-semibold">Portfólio</h2>

      <Accordion type="multiple" className="space-y-2">
        {projects.map((project, index) => {
          const isCustomTagEnabled = Array.from(project?.tags || []).some((tag) => tag === 'OUTRA');
          const isCustomCategoryEnabled = project?.category === 'OUTRA';

          return (
            <AccordionItem key={index} value={`project-${index}`}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pr-4">
                  <div className="w-full">
                    <AccordionTrigger className="cursor-pointer">
                      <CardTitle>{project?.name || `Projeto ${index + 1}`}</CardTitle>
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
                        value={project?.name || ''}
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
                        value={project.url || ''}
                        onChange={(e) => handleChange(index, 'url', e.target.value)}
                        placeholder="https://"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-lg" htmlFor={`description-${index}`}>
                        Descrição
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        value={project.description || ''}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                        placeholder="Breve descrição do projeto..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-lg">Selecione as Habilidades</Label>
                      <ToggleGroup
                        type="multiple"
                        value={project.tags || []}
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
                        value={project.customTags?.join(', ') || ''}
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
                          value={project.category || ''}
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
                          value={project.customCategory || ''}
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
