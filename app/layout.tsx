import type { Metadata } from 'next';
import { Geist, Geist_Mono, Leckerli_One, Montserrat } from 'next/font/google';
import './globals.css';
import Footer from '../components/footer';
import { Providers } from './providers';
import { MenuBarUser } from '@/components/menu.bar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Toaster } from '@/components/ui/sonner';

// Define tema global
const globalTheme = 'bg-background dark:bg-background text-color_text dark:text-color_text';

const leckerli = Leckerli_One({
  weight: '400',
  variable: '--font-leckerli',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: 'variable',
  display: 'auto',
  style: 'italic',
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BaixeMeuCV | Compartilhe seu currículo com um link',
  description:
    'Crie um link personalizado para seu currículo e compartilhe com recrutadores de forma rápida e prática.',
  keywords: [
    'currículo online',
    'baixar currículo',
    'compartilhar CV',
    'link do currículo',
    'BaixeMeuCV',
    'currículo digital',
  ],
  authors: [{ name: 'BaixeMeuCV', url: 'https://baixemeucv.com.br' }],
  openGraph: {
    title: 'BaixeMeuCV | Currículo com link personalizado',
    description:
      'Compartilhe seu currículo com um clique. Ideal para LinkedIn, e-mail, WhatsApp e muito mais.',
    url: 'https://baixemeucv.com.br',
    siteName: 'BaixeMeuCV',
    images: [
      {
        url: '/thumbnail.png',
        width: 1000,
        height: 1000,
        alt: 'Baixe Meu CV - Compartilhe seu currículo online',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baixe Meu CV',
    description: 'Compartilhe seu currículo com um link fácil e rápido.',
    images: ['https://baixemeucv.com.br/thumbnail.png'],
    creator: '@baixemeucv',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user || null;
  /* const userSession = {
    userSession,
  }; */
  return (
    <html lang="pt-BR">
      <Providers>
        <body
          className={`${globalTheme} ${montserrat.variable} ${leckerli.variable} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <MenuBarUser userSession={userSession} />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
