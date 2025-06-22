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
import { TbMenu2 } from 'react-icons/tb';
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
    <Menubar className="sticky top-0 z-50 justify-between w-full h-full px-4 py-4 mx-auto border-none shadow-none sm:px-14 bg-background sm:justify-end">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className={`w-28 h-auto sm:block ${userSession ? 'hidden' : 'block'}`}
          />
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
                <MenubarTrigger className="flex gap-2 items-center">
                  Olá, {profile?.name || userSession?.name || 'Usuário'}
                  {/* Fallback enquanto a imagem carrega */}
                  {!imageLoaded && (
                    <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
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

                <MenubarContent>
                  <MenubarItem onClick={() => router.push(`/${profile?.username}`)}>
                    <MdFindInPage /> Ver meu currículo
                  </MenubarItem>
                  <MenubarItem onClick={() => router.push('/edit-profile')}>
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
