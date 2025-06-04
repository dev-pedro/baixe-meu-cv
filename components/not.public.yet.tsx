import { SectionProps } from '@/app/types/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';

export default async function NotPublishedYet({ props }: { props: SectionProps }) {
  const { profile, userSession } = await props;
  return (
    <section className="mb-40 md:mb-20 mt-4">
      <div className="flex flex-col items-center text-center pt-20">
        {profile?.image ? (
          <Image
            src={profile?.image}
            alt="Imagem do usuário"
            width={288}
            height={288}
            className="w-44 h-44 sm:w-72 sm:h-72 rounded-full object-cover"
          />
        ) : (
          <FaUser className="w-44 h-44 rounded-full pb-2" />
        )}

        <p className="py-6 text-pretty text-xl">
          <strong>{profile?.name || userSession?.name}</strong>, ainda não tornou público seu
          currículo, volte depois.
        </p>
      </div>
    </section>
  );
}
