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
import { IoIosAddCircle } from 'react-icons/io';
import { getPickerBg } from '@/utils/colors';
import { Experience, Job } from '@/app/types/types';

interface Props {
  experience: Experience[];
  setExperience: (experience: Experience[]) => void;
  pickColor: number;
}

export default function ExperienceEditor({ experience, setExperience, pickColor }: Props) {
  const { bg, pickColor: textColor } = getPickerBg(pickColor);

  const handleChange = (index: number, field: keyof Experience, value: string | Job[]) => {
    const updated = [...experience];
    if (Array.isArray(updated[index])) return;

    if (field === 'company' || field === 'start' || field === 'end') {
      (updated[index] as Experience)[field] = value as string;
    } else if (field === 'jobs') {
      (updated[index] as Experience)[field] = value as Job[];
    }

    setExperience(updated);
  };

  const handleJobChange = (expIndex: number, jobIndex: number, field: keyof Job, value: string) => {
    const updated = [...experience];
    if (Array.isArray(updated[expIndex])) return;

    // Ensure jobs array exists
    if (!updated[expIndex].jobs) updated[expIndex].jobs = [];

    // Get the job object safely
    const job = updated[expIndex].jobs![jobIndex] as Job;

    // Assign the value to the field, ensuring it's safe to do so
    if (field === 'function' || field === 'description' || field === 'start' || field === 'end') {
      job[field] = value; // TypeScript will infer the correct type here
    }

    setExperience(updated);
  };

  const handleAdd = () => {
    setExperience([...experience, { company: '', start: '', end: '', jobs: [] }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setExperience(updated);
  };

  const handleAddJob = (index: number) => {
    const updated = [...experience];
    if (!Array.isArray(updated[index].jobs)) updated[index].jobs = [];
    updated[index]?.jobs!.push({ function: '', description: '', start: '', end: '' });
    setExperience(updated);
  };

  const handleRemoveJob = (expIndex: number, jobIndex: number) => {
    const updated = [...experience];
    updated[expIndex].jobs!.splice(jobIndex, 1);
    setExperience(updated);
  };

  return (
    <div className="space-y-4 border-t pt-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Experiências Profissionais</h2>
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
        {experience &&
          experience.map((exp, index) => (
            <AccordionItem key={index} value={`experience-${index}`}>
              <Card>
                <CardHeader className="flex flex-row justify-between items-center pr-4">
                  <div className="w-full">
                    <AccordionTrigger className="cursor-pointer">
                      <CardTitle>
                        {('company' in exp && exp?.company) || `Empresa ${index + 1}`}
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
                      <Label>Empresa</Label>
                      <Input
                        value={('company' in exp && exp.company) || ''}
                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                        placeholder="Nome da empresa"
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label>Início</Label>
                        <Input
                          value={('start' in exp && exp.start) || ''}
                          onChange={(e) => handleChange(index, 'start', e.target.value)}
                          placeholder="MM/AAAA"
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Fim</Label>
                        <Input
                          value={('end' in exp && exp.end) || ''}
                          onChange={(e) => handleChange(index, 'end', e.target.value)}
                          placeholder="MM/AAAA ou atual"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">Cargos</h3>
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => handleAddJob(index)}
                        >
                          Adicionar Cargo
                        </Button>
                      </div>
                      {exp &&
                        'jobs' in exp &&
                        exp?.jobs?.map((job, jobIndex) => (
                          <div key={jobIndex} className="p-2 border rounded-md space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="font-medium">Cargo {jobIndex + 1}</Label>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => handleRemoveJob(index, jobIndex)}
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                            <Input
                              value={('function' in job && job.function) || ''}
                              onChange={(e) =>
                                handleJobChange(index, jobIndex, 'function', e.target.value)
                              }
                              placeholder="Função"
                            />
                            <Input
                              value={('start' in job && job.start) || ''}
                              onChange={(e) =>
                                handleJobChange(index, jobIndex, 'start', e.target.value)
                              }
                              placeholder="Início (MM/AAAA)"
                            />
                            <Input
                              value={('end' in job && job.end) || ''}
                              onChange={(e) =>
                                handleJobChange(index, jobIndex, 'end', e.target.value)
                              }
                              placeholder="Fim (MM/AAAA ou atual)"
                            />
                            <Textarea
                              value={('description' in job && job.description) || ''}
                              onChange={(e) =>
                                handleJobChange(index, jobIndex, 'description', e.target.value)
                              }
                              placeholder="Descrição das atividades"
                            />
                          </div>
                        ))}
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
