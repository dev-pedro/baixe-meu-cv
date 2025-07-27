'use client';

import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import logo from '../public/thumbnail.svg';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from './ui/menubar';
import { FaUserEdit } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/app/context/user.context';
import { PerfilBarSkeleton } from './menu.bar.skeleton';
import { UserSession } from '@/app/types/types';

export function MenuBarUser({ userSession }: { userSession: UserSession }) {
  const { dataProfile } = useUser();
  const profile = dataProfile?.profile;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const displayName = (profile?.name || userSession?.name || 'Usuário')
    .split(' ')
    .slice(0, 2)
    .join(' ');

  const handleLogin = async () => {
    setLoading(true);
    await signIn('google');
  };

  const getImageSrc = () => {
    if (!profile?.image) return '/default-user.svg';
    return profile.image.startsWith('data:image')
      ? profile.image
      : `data:image/png;base64,${profile.image}`;
  };

  return (
    <Menubar className="sticky top-0 z-50 justify-between w-full h-full px-4 py-4 mx-auto border-none shadow-xs sm:px-14 bg-background sm:justify-end">
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          className={`relative w-auto h-full sm:block ${userSession ? 'hidden' : 'block'}`}
        >
          <div className="w-32 h-12">
            <Image src={logo} alt="logo" fill />
          </div>
        </Link>

        {loading ? (
          <PerfilBarSkeleton />
        ) : (
          <MenubarMenu>
            {!userSession ? (
              <Button variant="default" onClick={handleLogin} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    <span className="animate-pulse">Acessando...</span>
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            ) : (
              <div className="flex items-center justify-end w-full gap-2 text-lg">
                <MenubarTrigger className="flex items-center gap-2">
                  Olá, {displayName}
                  {/* Fallback enquanto a imagem carrega */}
                  {!imageLoaded && (
                    <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  )}
                  <Image
                    src={getImageSrc()}
                    alt="User_Image"
                    width={40}
                    height={40}
                    unoptimized
                    className={`object-cover w-10 h-10 rounded-full transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </MenubarTrigger>

                <MenubarContent alignOffset={90}>
                  <MenubarItem onClick={() => router.push(`/${profile?.username}`)}>
                    <MdFindInPage /> Ver meu currículo
                  </MenubarItem>
                  <MenubarItem onClick={() => router.push('/meu_perfil')}>
                    <FaUserEdit /> Editar meu currículo
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => signOut()} className="text-red-600">
                    Sair
                  </MenubarItem>
                </MenubarContent>
              </div>
            )}
          </MenubarMenu>
        )}
      </div>
    </Menubar>
  );
}
