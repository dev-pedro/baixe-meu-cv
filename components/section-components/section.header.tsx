'use client';

import { Button } from '@/components/ui/button';
import { FaFilePdf, FaLocationDot } from 'react-icons/fa6';
import clsx from 'clsx';
import { getPickerBg } from '@/utils/colors';
import { SendEmailButton } from '../send.email.button';
import ShareButton from '../share.button';
import Image from 'next/image';
import { SectionProps } from '@/app/types/types';
import { handleDownloadPdfApi } from '@/app/[find_person]/functions/pdf.download';

export default function Header({ props }: { props: SectionProps }) {
  const { profile } = props;
  const { bg, hover } = getPickerBg(profile?.pickColor || 5);

  return (
    <section id="capa" className="scroll-mt-20">
      <div className="flex justify-center sm:justify-end pt-4 gap-2">
        <Button
          variant={'download'}
          className={clsx(bg, hover)}
          onClick={() => handleDownloadPdfApi(profile)}
        >
          <FaFilePdf />
          Baixe este CV
        </Button>

        <ShareButton />
      </div>
      <div className="flex flex-col items-center text-center pt-10">
        <Image
          src={profile?.image || '/default-user.svg'}
          alt="Imagem do usuário"
          width={288}
          height={288}
          className="w-44 h-44 sm:w-72 sm:h-72 rounded-full object-cover"
        />
        <p className="text-xl md:text-4xl py-4 font-montserrat">{profile?.name}</p>
        <h1 className="font-bold text-2xl md:text-5xl pb-4">{profile?.profession}</h1>
        <p className="pb-6">{profile?.bio || ''}</p>

        <SendEmailButton
          email={profile?.email || ''}
          name={profile?.name || 'Usuário'}
          bg={bg}
          hover={hover}
        />

        <div className="flex items-baseline gap-1">
          <p className="pt-4">{`Estou em ${profile?.city || ''}`}</p>
          <FaLocationDot />
        </div>
      </div>
    </section>
  );
}
