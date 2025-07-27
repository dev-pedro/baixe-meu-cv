// app/pages/export/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import { ModernResume } from '@/app/pages/pdfs/modern';
import { CleanResume } from '@/app/pages/pdfs/clean';
import { CreativeResume } from '@/app/pages/pdfs/creative';

export async function POST(req: NextRequest) {
  const { profile, template } = await req.json();

  let doc;

  switch (template) {
    case 'modern':
      doc = <ModernResume profile={profile} />;
      break;
    case 'clean':
      doc = <CleanResume profile={profile} />;
      break;
    case 'creative':
      doc = <CreativeResume profile={profile} />;
      break;
    default:
      doc = <ModernResume profile={profile} />;
  }

  const pdfBuffer = await pdf(doc).toBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="curriculo.pdf"`,
    },
  });
}
