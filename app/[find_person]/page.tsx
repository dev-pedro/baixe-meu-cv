import Education from '../../components/section.education';
import Experience from '../../components/section.experience';
import Courses from '../../components/section.courses';
import Portifolio from '../../components/section.potfolio';
import NotPublishedYet from '../../components/not.public.yet';
import { FaUserSlash } from 'react-icons/fa6';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { example } from '../data/curriculo.exemple';
import { FloatingActionMenu } from '@/components/float.download.share';
import Header from '@/components/section.header';
import Skills from '@/components/section.skills';
import SoftSkills from '@/components/section.soft.skills';
import { getUserByUserName } from '@/lib/user';

type PageProps = {
  params: {
    find_person: string;
  };
};

// 👇 Função usada pelo Next.js para gerar <head> dinamicamente
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { find_person } = await params;
  const user = await getUserByUserName(find_person);

  if (!user || !user.public) {
    return {
      title: 'Currículo não encontrado | BaixeMeuCV',
      description: 'O currículo que você está tentando acessar não existe ou está privado.',
    };
  }

  const nome = user.name || 'Usuário';
  const profissao = user.profession || 'Profissional';
  const perfilUrl = `https://baixemeucv.com.br/${find_person}`;
  const ogImage = user.image || 'https://baixemeucv.com.br/thumbnail.png';

  return {
    title: `${nome} | ${profissao} | Currículo Online`,
    description: `Conheça o currículo profissional de ${nome}, ${profissao}, disponível em BaixeMeuCV.`,
    keywords: [nome, profissao, 'currículo online', 'baixar CV', 'BaixeMeuCV'],
    openGraph: {
      title: `${nome} | Currículo Online`,
      description: `Currículo de ${nome} disponível para visualização e download.`,
      url: perfilUrl,
      siteName: 'BaixeMeuCV',
      images: [
        {
          url: ogImage,
          width: 1000,
          height: 1000,
          alt: `Currículo de ${nome}`,
        },
      ],
      locale: 'pt_BR',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${nome} | BaixeMeuCV`,
      description: `Currículo de ${nome}, ${profissao}. Visualize e compartilhe.`,
      images: [ogImage],
    },
  };
}

export default async function ShowCurriculoPage({ params }: PageProps) {
  // Acessando corretamente o username
  const { find_person } = await params;
  const user = await getUserByUserName(find_person);

  if (!user?.profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-600 space-y-4">
        <FaUserSlash className="w-16 h-16 text-red-400" />
        <h1 className="text-2xl font-semibold">Usuário não encontrado</h1>
        <p className="text-base text-gray-500">
          O currículo que você está tentando acessar não existe ou foi removido.
        </p>
      </div>
    );
  }

  // Pega o usuário autenticado do lado servidor
  const session = await getServerSession(authOptions);

  const userSession = (await session?.user) || null;

  const props = {
    profile: user.profile,
    userSession,
  };

  return (
    <div className="mx-auto max-w-12/12">
      {user?.profile.public ? (
        <div className="flex flex-col gap-4 mx-auto max-w-11/12 md:max-w-10/12">
          <Header props={props} />
          <Portifolio props={props} />
          <Education props={props} />
          <Experience props={props} />
          <Courses props={props} />
          <Skills props={props} />
          <SoftSkills props={props} />
          <FloatingActionMenu props={props} />
        </div>
      ) : (
        <NotPublishedYet props={props} />
      )}
    </div>
  );
}
