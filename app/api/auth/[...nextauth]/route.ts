import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // <-- ajusta esse path se estiver em outro lugar

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
