'use server';

import { Button } from '@/components/ui/button';
import { FaFilePdf, FaLocationDot, FaShare } from 'react-icons/fa6';
import { decryptData } from '../utils/decrypt.data';
import clsx from 'clsx';
import { getPickerBg } from '@/utils/colors';
import { SendEmailButton } from './send.email.button';
import ShareButton from './share.button';

export default async function Header({ props }: { props: any }) {
  const { curriculo }: { curriculo: any } = await props;
  const { bg, hover } = getPickerBg(curriculo.pickColor);
  const decryptedEmail = (await decryptData(curriculo?.emailEncrypted)) || '';

  return (
    <section id="capa" className='scroll-mt-20'>
      <div className="flex justify-center sm:justify-end pt-4 gap-2">
        <Button variant={'download'} className={clsx(bg, hover)}>
          <FaFilePdf />
          Baixe este CV
        </Button>
        <ShareButton />
      </div>
      <div className="flex flex-col items-center text-center pt-10">
        <img
          src={curriculo?.image}
          alt="Imagem do usuário"
          className="w-44 md:w-xs rounded-full object-cover pb-2"
        />
        <p className="text-xl md:text-4xl pb-4 font-montserrat">{curriculo?.name}</p>
        <h1 className="font-bold text-2xl md:text-5xl pb-4">{curriculo?.profession}</h1>
        <p className="pb-6">{curriculo.bio}</p>

        <SendEmailButton email={decryptedEmail} name={curriculo?.name} bg={bg} hover={hover} />

        <div className="flex items-baseline gap-1">
          <p className="pt-4">{`Estou em ${curriculo.city}`}</p>
          <FaLocationDot />
        </div>
      </div>
    </section>
  );
}
