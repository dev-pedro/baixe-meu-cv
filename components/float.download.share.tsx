'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaDownload, FaRegShareSquare, FaShareAlt } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import clsx from 'clsx';
import { getPickerBg } from '@/utils/colors';
import { DataCreateCurriculoForm, SectionProps, UserSession } from '@/app/types/types';
import { handleDownloadPdfApi } from '@/app/[find_person]/functions/pdf.download';

export function FloatingActionMenu({ props }: { props: SectionProps }) {
  const [isVisible, setIsVisible] = useState(false);
  const { profile, userSession }: { profile: DataCreateCurriculoForm; userSession: UserSession } =
    props;
  const { bg, hover } = getPickerBg(profile?.pickColor || 5);
  const displayName = (profile?.name || userSession?.name || 'Usuário')
    .split(' ')
    .slice(0, 2)
    .join(' ');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        'fixed bottom-5 right-5 sm:bottom-20 sm:right-20 z-50 transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-8 pointer-events-none'
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={`rounded-full w-14 h-14 p-0 shadow ${bg} ${hover} text-foreground`}
            variant="default"
          >
            <FaRegShareSquare size={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-full">
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className={`justify-start gap-2 ${hover}`}
              onClick={() => handleDownloadPdfApi(profile)}
            >
              <FaDownload /> {`Baixar Currículo de ${displayName}`}
            </Button>
            <Button
              variant="ghost"
              className={`justify-start gap-2 ${hover}`}
              onClick={() => console.log('Compartilhar')}
            >
              <FaShareAlt />
              Compartilhar este Currículo
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
