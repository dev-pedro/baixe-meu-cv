// context/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserByEmailHash } from '@/lib/user';
import { Prisma } from '@/lib/generated/prisma';

type UserData = Prisma.UserCreateInput;

type UserContextType = {
  myCurriculo: { user: UserData | null; message: string; error: boolean } | null;
  setMyCurriculo: React.Dispatch<
    React.SetStateAction<{ user: UserData | null; message: string; error: boolean } | null>
  >;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  myCurriculo: null,
  setMyCurriculo: () => {},
  loading: true,
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [myCurriculo, setMyCurriculo] = useState<{
    user: UserData | null;
    message: string;
    error: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function fetchUser() {
        if (status !== 'authenticated' || !session?.user?.email) return;

        try {
          const result = await getUserByEmailHash(session.user.email);
          const curriculo = {
            user: result?.user || null,
            message: result?.message || 'Usuário encontrado com sucesso!',
            error: result?.error || false,
          };
          setMyCurriculo(curriculo);
        } catch (error) {
          console.error('Erro ao buscar usuário', error);
        } finally {
          setLoading(false);
        }
      }

      fetchUser();
    },
    [session, status]
  );

  return (
    <UserContext.Provider value={{ myCurriculo, setMyCurriculo, loading }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
