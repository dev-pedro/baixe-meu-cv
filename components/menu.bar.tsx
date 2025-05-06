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
import { use, useState } from 'react';
import { useUser } from '@/app/context/user.context';

export function MenuBarUser({ props }: { props: any }) {
  const { userSession } = props;
  const { myCurriculo } = useUser();
  const user = myCurriculo?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn('google');
    // O redirecionamento será tratado pelo next-auth, não é necessário setLoading(false)
  };

  return (
    <Menubar className="sticky top-0 px-14 py-4 w-full mx-auto h-full z-50 bg-background border-none shadow-none justify-between sm:justify-end">
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
        <MenubarMenu>
          {!userSession ? (
            <Button variant="default" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-1 h-4 w-4" />{' '}
                  <span className="animate-pulse">Acessando...</span>
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          ) : (
            <div className="flex text-lg gap-2 items-center justify-end w-full">
              <MenubarTrigger className="flex gap-2 ">
                Olá, {user?.name || 'Usuário'}
                {user?.image ? (
                  <Image
                    src={myCurriculo?.user?.image || userSession?.image || '/default-user.svg'}
                    alt="User_Image"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <TbMenu2 />
                )}
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() => router.push(`${myCurriculo?.user?.username || userSession?.name}`)}
                >
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
      </div>
    </Menubar>
  );
}
