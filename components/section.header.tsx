/* eslint-disable @next/next/no-img-element */
'use server';

import { Button } from '@/components/ui/button';
import { FaFilePdf, FaLocationDot, FaShare } from 'react-icons/fa6';
import { decryptData } from '../utils/decrypt.data';
import clsx from 'clsx';
import { getPickerBg } from '@/utils/colors';
import { SendEmailButton } from './send.email.button';
import ShareButton from './share.button';
import Image from 'next/image';

export default async function Header({ props }: { props: any }) {
  const { profile }: { profile: any } = await props;
  const { bg, hover } = getPickerBg(profile.pickColor);
  const decryptedEmail = (await decryptData(profile?.emailEncrypted)) || '';

  return (
    <section id="capa" className="scroll-mt-20">
      <div className="flex justify-center sm:justify-end pt-4 gap-2">
        <Button variant={'download'} className={clsx(bg, hover)}>
          <FaFilePdf />
          Baixe este CV
        </Button>
        <ShareButton />
      </div>
      <div className="flex flex-col items-center text-center pt-10">
        <Image
          src={profile?.image}
          alt="Imagem do usuário"
          width={288}
          height={288}
          className="w-44 h-44 sm:w-72 sm:h-72 rounded-full object-cover"
        />
        <p className="text-xl md:text-4xl pb-4 font-montserrat">{profile?.name}</p>
        <h1 className="font-bold text-2xl md:text-5xl pb-4">{profile?.profession}</h1>
        <p className="pb-6">{profile.bio}</p>

        <SendEmailButton email={decryptedEmail} name={profile?.name} bg={bg} hover={hover} />

        <div className="flex items-baseline gap-1">
          <p className="pt-4">{`Estou em ${profile.city}`}</p>
          <FaLocationDot />
        </div>
      </div>
    </section>
  );
}
