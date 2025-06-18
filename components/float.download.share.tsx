'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaDownload, FaRegShareSquare, FaShareAlt } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import clsx from 'clsx';
import { getPickerBg } from '@/utils/colors';

export function FloatingActionMenu({ props }: { props: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const { profile, userSession }: { profile: any; userSession: any } = props;
  const { bg, hover } = getPickerBg(profile.pickColor);

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
              onClick={() => console.log('Baixar currículo')}
            >
              <FaDownload /> {`Baixar Currículo de ${props.profile.name}`}
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
