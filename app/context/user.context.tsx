// context/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserByEmailHash } from '@/lib/user';
import { UserDataResult } from '../types/types';

type UserContextType = {
  dataProfile: UserDataResult | null;
  setProfile: React.Dispatch<React.SetStateAction<UserDataResult | null>>;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  dataProfile: null,
  setProfile: () => {},
  loading: true,
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [dataProfile, setDataProfile] = useState<UserDataResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function fetchUser() {
        if (status !== 'authenticated' || !session?.user?.email) return;

        try {
          const result = await getUserByEmailHash(session.user.email);
          const curriculo = {
            profile: result?.profile || null,
            message: result?.message,
            error: result?.error || false,
          };
          console.log('curriculo contexto: ', curriculo)
          setDataProfile(curriculo);
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
    <UserContext.Provider value={{ dataProfile: dataProfile, setProfile: setDataProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
