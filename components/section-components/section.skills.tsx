import { getPickerBg } from '@/utils/colors';
import { GiSwissArmyKnife } from 'react-icons/gi';
import { Badge } from '../ui/badge';
import { SectionProps } from '@/app/types/types';

export default async function Skills({ props }: { props: SectionProps }) {
  const { profile } = await props;
  const { bg } = getPickerBg(profile?.pickColor || 5);

  return (
    <section id="skills" className="scroll-mt-20">
      {profile && Array.isArray(profile.skills) && profile.skills.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center mb-4 mt-6">
            <GiSwissArmyKnife className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">Skills (Habilidades Técnicas)</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile &&
              profile.skills
                ?.sort((a: string, b: string) => b.length - a.length) // Ordena maior texto para o menor
                .map((skill: string, i: number) => (
                  <Badge key={i} variant="outline" className={`${bg} text-sm`}>
                    {skill}
                  </Badge>
                ))}
          </div>
        </div>
      )}
    </section>
  );
}
