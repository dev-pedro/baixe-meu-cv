import { getPickerBg } from '@/utils/colors';
import { RiEmpathizeFill } from 'react-icons/ri';
import { Badge } from './ui/badge';

export default async function SoftSkills({ props }: { props: any }) {
  const { curriculo, userSession }: { curriculo: any; userSession: any } = await props;
  const { bg, hover } = getPickerBg(curriculo.pickColor);

  return (
    <section id="softskills" className="scroll-mt-20">
      <div className="flex items-center mb-4 mt-6">
        <RiEmpathizeFill className="w-8 h-8 mr-2" />
        <h2 className="text-2xl font-semibold">Soft Skills</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {curriculo.softSkills?.map((skill: string, i: number) => (
            <Badge key={i} variant="outline" className={`${bg} text-sm`}>
              {skill}
            </Badge>
        ))}
      </div>
    </section>
  );
}
