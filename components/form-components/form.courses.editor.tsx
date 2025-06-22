'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IoIosAddCircle } from 'react-icons/io';
import { Course } from '@/app/types/types';
import { getPickerBg } from '@/utils/colors';

interface Props {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  pickColor: number;
}

export default function CourseEditor({ courses, setCourses, pickColor }: Props) {
  const { bg, hover } = getPickerBg(pickColor);

  const handleChange = (index: number, field: keyof Course, value: string | boolean) => {
    const updated = [...courses];
    updated[index][field] = value as Course[keyof Course];
    setCourses(updated);
  };

  const handleAdd = () => {
    setCourses([
      ...courses,
      { institution: '', name: '', year: '', description: '', online: false },
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  return (
    <div className="space-y-4 border-t pt-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Cursos</h2>
        <Button className={`${bg} ${hover}`} type="button" variant="download" onClick={handleAdd}>
          <IoIosAddCircle />
        </Button>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {courses.map((course, index) => (
          <AccordionItem key={index} value={`course-${index}`}>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pr-4">
                <div className="w-full">
                  <AccordionTrigger className="cursor-pointer">
                    <CardTitle>
                      {('name' in course && course.name) || `Curso ${index + 1}`}
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
                      value={('institution' in course && course.institution) || ''}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      placeholder="Udemy, Alura..."
                    />
                  </div>

                  <div>
                    <Label htmlFor={`curso-${index}`} className="pb-2">
                      Nome do curso
                    </Label>
                    <Input
                      id={`curso-${index}`}
                      value={('name' in course && course.name) || ''}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      placeholder="React Avançado"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`ano-${index}`} className="pb-2">
                      Ano
                    </Label>
                    <Input
                      id={`ano-${index}`}
                      value={('year' in course && course.year) || ''}
                      onChange={(e) => handleChange(index, 'year', e.target.value)}
                      placeholder="2023"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`descricao-${index}`} className="pb-2">
                      Descrição
                    </Label>
                    <Textarea
                      id={`descricao-${index}`}
                      value={('description' in course && course.description) || ''}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      placeholder="Resumo do conteúdo abordado..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`online-${index}`}
                      checked={'online' in course && !!course.online}
                      onCheckedChange={(checked) => handleChange(index, 'online', !!checked)}
                    />
                    <Label htmlFor={`online-${index}`}>Curso Online</Label>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
