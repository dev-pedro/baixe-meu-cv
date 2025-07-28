'use client';
export const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Baixe Meu CV',
        text: 'Confira este currículo online!',
        url: window.location.href,
      });
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  } else {
    alert('Compartilhamento não suportado neste navegador.');
  }
};
