import { getPickerBg } from '@/utils/colors';
import { GiSwissArmyKnife } from 'react-icons/gi';
import { Badge } from './ui/badge';

export default async function Skills({ props }: { props: any }) {
  const { profile } = await props;
  const { bg, hover } = getPickerBg(profile.pickColor);

  return (
    <section id="skills" className="scroll-mt-20">
      <div className="flex items-center mb-4 mt-6">
        <GiSwissArmyKnife className="w-8 h-8 mr-2" />
        <h2 className="text-2xl font-semibold">Skills</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {profile.skills
          ?.sort((a: string, b: string) => b.length - a.length) // Ordena maior texto para o menor
          .map((skill: string, i: number) => (
            <Badge key={i} variant="outline" className={`${bg} text-sm`}>
              {skill}
            </Badge>
          ))}
      </div>
    </section>
  );
}
