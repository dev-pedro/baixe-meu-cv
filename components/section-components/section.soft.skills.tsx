import { getPickerBg } from '@/utils/colors';
import { RiEmpathizeFill } from 'react-icons/ri';
import { Badge } from '../ui/badge';
import { SectionProps } from '@/app/types/types';

export default async function SoftSkills({ props }: { props: SectionProps }) {
  const { profile } = await props;
  const { bg, hover } = getPickerBg(profile?.pickColor || 1);

  return (
    <section id="softskills" className="scroll-mt-20">
      {profile && Array.isArray(profile.softSkills) && profile.softSkills.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center mb-4 mt-6">
            <RiEmpathizeFill className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">Soft Skills (Habilidades Interpessoais)</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile &&
              profile.softSkills
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
