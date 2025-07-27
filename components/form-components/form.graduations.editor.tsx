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
import { IoIosAddCircle } from 'react-icons/io';
import { getPickerBg } from '@/utils/colors';
import { Checkbox } from '../ui/checkbox';

interface Props {
  graduation: Graduation[];
  setGraduation: (graduation: Graduation[]) => void;
  pickColor: number;
}

export default function GraduationEditor({ graduation, setGraduation, pickColor }: Props) {
  const { bg, pickColor: textColor } = getPickerBg(pickColor);

  const handleChange = (index: number, field: keyof Graduation, value: string | boolean) => {
    const updated = [...graduation];
    if (Array.isArray(updated[index])) return;
    if (
      field === 'name' ||
      field === 'description' ||
      field === 'institution' ||
      field === 'year'
    ) {
      (updated[index] as Graduation)[field] = value as string;
    } else if (field === 'online') {
      (updated[index] as Graduation)[field] = value as boolean;
    }
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
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Formações Acadêmicas</h2>
        <Button
          size={'icon'}
          className={`${bg} hover:bg-${textColor}  hover:scale-110  rounded-full`}
          type="button"
          variant="download"
          onClick={handleAdd}
        >
          <IoIosAddCircle className={`!w-7 !h-7 text-gray-500`} />
        </Button>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {graduation.map((formacao, index) => (
          <AccordionItem key={index} value={`formacao-${index}`}>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pr-4">
                <div className="w-full">
                  <AccordionTrigger className="cursor-pointer">
                    <CardTitle>
                      {('name' in formacao && formacao.name) || `Formação ${index + 1}`}
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
                  <div>
                    <Label htmlFor={`instituicao-${index}`} className="pb-2">
                      Instituição
                    </Label>
                    <Input
                      id={`instituicao-${index}`}
                      value={('institution' in formacao && formacao.institution) || ''}
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
                      value={('name' in formacao && formacao.name) || ''}
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
                      value={('year' in formacao && formacao.year) || ''}
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
                      value={('description' in formacao && formacao?.description) || ''}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      placeholder="Detalhes da formação..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`online-${index}`}
                      checked={'online' in formacao && !!formacao.online}
                      onCheckedChange={(checked) => handleChange(index, 'online', !!checked)}
                    />
                    <Label htmlFor={`online-${index}`}>Graduação Online</Label>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      {/* <Button type="button" variant="outline" onClick={handleAdd}>
        Adicionar Formação
      </Button> */}
    </div>
  );
}
