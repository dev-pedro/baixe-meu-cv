// app/api/users/[slug]/route.ts
import { prisma } from '@/lib/prisma';
import { hashEmail } from '@/utils/hash.email';
import { encryptData } from '@/utils/encrypt.data';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    email: string;
  };
};

// Buscar usuário pelo email (GET)
export async function GET(_req: Request, { params }: Params) {
  const emailHash = await hashEmail(params.email);
  try {
    const user = await prisma.user.findUnique({
      where: { emailHash },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
// Criar ou atualiza usuário (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, email, ...bodyRest } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email é obrigatório!' }, { status: 400 });
    }

    const emailHash = await hashEmail(email);
    const emailEncrypted = await encryptData(email);
    const phoneEncrypted = await encryptData(phone || '');

    const existingUser = await prisma.user.findUnique({ where: { emailHash } });

    if (existingUser) {
      // Atualiza
      const updatedUser = await prisma.user.update({
        where: { emailHash },
        data: {
          ...bodyRest,
          emailHash,
          emailEncrypted,
          phoneEncrypted,
        },
      });

      return NextResponse.json(updatedUser, { status: 200 });
    } else {
      // Cria
      const newUser = await prisma.user.create({
        data: {
          emailHash,
          emailEncrypted,
          phoneEncrypted,
          ...bodyRest,
        },
      });

      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (error) {
    console.error('Erro ao criar/atualizar usuário:', error);
    return NextResponse.json({ message: 'Erro interno ao processar usuário' }, { status: 500 });
  }
}
