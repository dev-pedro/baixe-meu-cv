'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/thumbnail.svg';
import { UserSession } from './types/types';

interface HomeClientProps {
  session: UserSession;
}

export default function HomeClient({ session }: HomeClientProps) {
  return (
    <main className="flex flex-col justify-start mx-auto w-full sm:max-w-7xl px-4">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <Image alt="logo" src={logo} className="w-52 sm:w-80 object-cover" />
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Construa e compartilhe grátis seu <span className="text-primary">Currículo Online</span>
          </h1>
        </div>

        <p className="text-lg text-muted-foreground">
          Cadastre suas informações pessoais, experiências, formações e habilidades de forma simples
          e rápida, mantendo seu currículo sempre atualizado e disponível online para enviar a
          recrutadores, colegas ou empresas. Em poucos minutos, você terá um currículo elegante e
          acessível.{' '}
          <strong>
            Seu telefone e e-mail, são criptografados e armazenados com segurança, acessíveis apenas
            por você.
          </strong>{' '}
          Além disso, é possível editar e atualizar seu currículo a qualquer momento, bem como
          baixá-lo em PDF e compartilhá-lo com quem desejar.
        </p>

        <div className="flex flex-col justify-center gap-4 py-4 flex-wrap">
          <div className="flex justify-center gap-4">
            {!session && (
              <Button
                onClick={() => signIn('google')}
                variant="default"
                className="rounded-2xl !p-6"
              >
                Entrar com Google
              </Button>
            )}

            <Link href="/curriculo-example" passHref>
              <Button asChild variant="outline" className="rounded-2xl p-6">
                <span>Ver exemplo</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-lg sm:w-3xl">
          <h2 className="text-2xl font-semibold mb-2">📄 Exportação em PDF</h2>
          <p className="text-muted-foreground">
            Os visitantes podem baixar uma versão em PDF do seu currículo com um clique. Ideal para
            processos seletivos e entrevistas!
          </p>
        </div>
      </div>
    </main>
  );
}
