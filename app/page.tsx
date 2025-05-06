// app/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import HomeClient from './home.client';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <HomeClient session={session} />;
}
