'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface ClientButtonProps {
  email: string;
  name: string;
  bg: string;
  hover: string;
}

export function SendEmailButton({ email, name, bg, hover }: ClientButtonProps) {
  const handleSendEmail = () => {
    if (!email) return;
    const subject = 'Contato via Currículo Online';
    const body = `Olá ${name},\n\nAcessei seu currículo online e gostaria de conversar sobre suas competências...`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Button variant={'contact'} className={clsx(bg, hover)} onClick={handleSendEmail}>
      Fale comigo
    </Button>
  );
}
