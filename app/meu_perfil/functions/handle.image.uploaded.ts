import { DataCreateCurriculoForm } from '@/app/types/types';

export function handleImageUpload(
  file: File | undefined,
  setFormData: React.Dispatch<React.SetStateAction<DataCreateCurriculoForm | undefined | null>>
) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      // Força para PNG
      const pngDataUrl = canvas.toDataURL('image/png');

      setFormData((prev) => {
        const currentData: DataCreateCurriculoForm = {
          image: pngDataUrl,
          username: prev?.username ?? null,
          name: prev?.name ?? null,
          email: prev?.email ?? null,
          phone: prev?.phone ?? null,
          bio: prev?.bio ?? '',
          pickColor: prev?.pickColor ?? 5,
          profession: prev?.profession ?? '',
          city: prev?.city ?? '',
          showPhoneInPDF: prev?.showPhoneInPDF ?? false,
          showEmailInPDF: prev?.showEmailInPDF ?? false,
          public: prev?.public ?? false,
          portfolio: prev?.portfolio ?? [],
          graduation: prev?.graduation ?? [],
          experiences: prev?.experiences ?? [],
          courses: prev?.courses ?? [],
          skills: prev?.skills ?? [],
          softSkills: prev?.softSkills ?? [],
        };

        return currentData;
      });
    };
    img.src = reader.result as string;
  };

  reader.readAsDataURL(file);
}
