'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Graduation } from '@/app/types/types';

interface Props {
  graduation: Graduation[];
  setGraduation: (graduation: Graduation[]) => void;
}

export default function GraduationEditor({ graduation, setGraduation }: Props) {
  const handleChange = (index: number, field: keyof Graduation, value: string) => {
    const updated = [...graduation];
    updated[index][field] = value as Graduation[keyof Graduation];
    setGraduation(updated);
  };

  const handleAdd = () => {
    setGraduation([...graduation, { name: '', institution: '', year: '', description: '' }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...graduation];
    updated.splice(index, 1);
    setGraduation(updated);
  };

  return (
    <div className="space-y-4 border-t pt-2">
      <h2 className="text-lg font-semibold">Formações Acadêmicas</h2>

      <Accordion type="multiple" className="space-y-2">
        {graduation.map((formacao, index) => (
          <AccordionItem key={index} value={`formacao-${index}`}>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pr-4">
                <div className="w-full">
                  <AccordionTrigger className="cursor-pointer">
                    <CardTitle>{formacao.name || `Formação ${index + 1}`}</CardTitle>
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
                    <Label htmlFor={`instituicao-${index}`} className="pb-2">
                      Instituição
                    </Label>
                    <Input
                      id={`instituicao-${index}`}
                      value={formacao.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      placeholder="Faculdade Anhanguera"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`curso-${index}`} className="pb-2">
                      Nome do curso
                    </Label>
                    <Input
                      id={`curso-${index}`}
                      value={formacao.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      placeholder="Desenvolvimento de Sistemas"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`ano-${index}`} className="pb-2">
                      Ano
                    </Label>
                    <Input
                      id={`ano-${index}`}
                      value={formacao.year}
                      onChange={(e) => handleChange(index, 'year', e.target.value)}
                      placeholder="2015"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`descricao-${index}`} className="pb-2">
                      Descrição
                    </Label>
                    <Textarea
                      id={`descricao-${index}`}
                      value={formacao.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      placeholder="Detalhes da formação..."
                    />
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      <Button type="button" variant="outline" onClick={handleAdd}>
        Adicionar Formação
      </Button>
    </div>
  );
}
