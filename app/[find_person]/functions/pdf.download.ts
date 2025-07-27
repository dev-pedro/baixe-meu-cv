import { DataCreateCurriculoForm } from '@/app/types/types';

export const handleDownloadPdfApi = async (profile: DataCreateCurriculoForm) => {
  try {
    const response = await fetch('/pages/export', {
      method: 'POST',
      body: JSON.stringify({
        profile,
        template: profile?.template || 'modern',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `www.baixemeucv.com.br-${profile?.name}.pdf`;
    link.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Erro ao chamar API:', err);
  }
};
