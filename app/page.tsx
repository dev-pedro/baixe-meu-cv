// app/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import HomeClient from './home.client';
import { UserSession } from './types/types';

export default async function HomePage() {
  const session: UserSession = await getServerSession(authOptions);

  return <HomeClient session={session} />;
}
