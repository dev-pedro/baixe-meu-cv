import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';

export default async function NotPublishedYet({ props }: { props: any }) {
  const { curriculo, userSession }: { curriculo: any; userSession: any } = await props;
  return (
    <section className="mb-40 md:mb-20 mt-4">
      <div className="flex flex-col items-center text-center pt-20">
        {curriculo?.image ? (
          <img
            src={curriculo?.image}
            alt="Imagem do usuário"
            className="w-44 md:w-xs rounded-full object-cover pb-2"
          />
        ) : (
          <FaUser className="w-44 h-44 rounded-full pb-2" />
        )}

        <p className="pb-6 text-pretty text-xl">
          <strong>{curriculo.name}</strong>, ainda não tornou público seu currículo, volte depois.
        </p>
      </div>
    </section>
  );
}
