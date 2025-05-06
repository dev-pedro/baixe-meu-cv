'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Portifolio } from '@/app/types/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  projects: Portifolio[];
  setProjects: (projects: Portifolio[]) => void;
}

export default function PortfolioEditor({ projects, setProjects }: Props) {
  const handleChange = (index: number, field: keyof Portifolio, value: string) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleAdd = () => {
    setProjects([...projects, { name: '', url: '', description: '', technologies: '' }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  return (
    <div className="space-y-4 border-t pt-2">
      <h2 className="text-lg font-semibold">Portfólio</h2>

      <Accordion type="multiple" className="space-y-2 ">
        {projects.map((project, index) => (
          <AccordionItem key={index} value={`project-${index}`}>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pr-4">
                <div className='w-full'>

                <AccordionTrigger className='cursor-pointer'>
                  <CardTitle>{project.name || `Projeto ${index + 1}`}</CardTitle>
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
                  <div>
                    <Label htmlFor={`name-${index}`}>Nome do Projeto</Label>
                    <Input
                      id={`name-${index}`}
                      value={project.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      placeholder="Ex: Meu projeto legal"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`url-${index}`}>URL do Projeto</Label>
                    <Input
                      id={`url-${index}`}
                      value={project.url}
                      onChange={(e) => handleChange(index, 'url', e.target.value)}
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`description-${index}`}>Descrição</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={project.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      placeholder="Breve descrição do projeto..."
                    />
                  </div>

                  <div>
                    <Label htmlFor={`technologies-${index}`}>
                      Tecnologias (separadas por vírgula)
                    </Label>
                    <Input
                      id={`technologies-${index}`}
                      value={project.technologies}
                      onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                      placeholder="React, Node.js, Tailwind CSS"
                    />
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      <Button type="button" variant="outline" onClick={handleAdd}>
        Adicionar Projeto
      </Button>
    </div>
  );
}
