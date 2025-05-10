// app/edit-profile/edit.profile.client.tsx
'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createOrUpdateUser } from '@/lib/user';
import { Graduation, Portfolio, UserSession, DataCreateCurriculoForm } from '../types/types';
import { toast } from 'sonner';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '../context/user.context';
import PortfolioEditor from '@/components/form.portifolio.editor';
import PickColor from '@/components/form.pick.color';
import GraduationEditor from '@/components/form.graduations.editor';
import { FaShieldAlt } from 'react-icons/fa';
import { ProfileSkeleton } from '@/components/loading.component';

export default function EditProfileClient({ userSession }: { userSession?: UserSession }) {
  //const { profile, message, error } = userProfile || {};
  const [formData, setFormData] = useState<DataCreateCurriculoForm>();
  const { setMyCurriculo, myCurriculo, loading } = useUser();
  const message = myCurriculo?.message;
  const error = myCurriculo?.error;
  console.log('Editor perfil: ', loading);

  useEffect(() => {
    if (!loading && myCurriculo?.profile) {
      const profile = myCurriculo.profile;

      setFormData({
        username: profile.username || '',
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        image: profile.image || userSession?.image || '',
        bio: profile.bio || '',
        pickColor: profile.pickColor || 1,
        profession: profile.profession,
        city: profile.city || '',
        showPhoneInPDF: profile.showPhoneInPDF ?? false,
        showEmailInPDF: profile.showEmailInPDF ?? true,
        public: profile.public ?? false,
        portfolio: profile.portfolio || [],
        graduation: profile.graduation || [],
        experiences: profile.experiences || [],
        courses: profile.courses || [],
        skills: profile.skills || [],
        softSkills: profile.softSkills || [],
      });
    }
  }, [loading, myCurriculo, userSession]);

  // limpa a mensagem após 5 segundos
  useEffect(() => {
    if (message) {
      if (message.includes('sucesso!')) {
        toast.success(message, {
          closeButton: true,
          duration: 5000,
          className: '!text-green-700',
        });
      } else {
        toast.error(message, {
          closeButton: true,
          duration: 5000,
          className: '!text-red-700',
        });
      }

      const timeout = setTimeout(() => {
        setMyCurriculo(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message, setMyCurriculo]);

  if (error) {
    return <div className="mt-10 text-center text-red-600">{message}</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle para checkboxes com ShadCN
  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // handle para o portfólio
  const handlePortfolioChange = (projects: Portfolio[]) => {
    setFormData((prev: any) => ({
      ...prev,
      portfolio: projects,
    }));
  };

  // handle para o pickColor
  const handlePickColorChange = (color: number) => {
    setFormData((prev: any) => ({
      ...prev,
      pickColor: color,
    }));
  };

  // handle para o graduations
  const handleGraduationChange = (graduations: Graduation[]) => {
    setFormData((prev: any) => ({
      ...prev,

      graduation: graduations,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Dados do formulário:', formData);

    try {
      const payload: DataCreateCurriculoForm = formData || null; // certifique-se que formData siga o tipo

      const result = await createOrUpdateUser(payload);
      console.log('Resultado do update:', result);

      // Atualiza o estado do usuário no contexto
      setMyCurriculo(result);
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 mx-auto overflow-hidden md:overflow-hidden">
      {/* Imagem do usuário com ícone de edição */}
      <div className="relative flex justify-center mb-4 w-42 h-42">
        <Image
          src={formData?.image || '/default-user.svg'}
          alt="User"
          width={168}
          height={168}
          className="object-cover border-2 border-gray-300 rounded-full"
        />

        {/* Ícone de edição (câmera) */}
        <label className="absolute bottom-2 right-[5%] bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
          <Camera className="w-5 h-5 text-gray-600" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData((prev: any) => ({
                    ...prev,
                    image: reader.result as string,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
      </div>

      <div className="flex flex-col items-center justify-center w-full px-4 pb-1">
        <h1 className="text-2xl font-bold">Meu Currículo</h1>
        <p className="text-sm text-center text-gray-500 bg-1">
          Preencha os campos abaixo para criar ou atualizar seu currículo.
        </p>
      </div>

      <PickColor color={formData?.pickColor || 1} setPickColor={handlePickColorChange} />

      <div className="flex items-center justify-center w-full mt-2 sm:justify-end sm:w-8/12 text-nowrap">
        <FaShieldAlt className="mr-1" /> dados protegidos
      </div>

      {/* Área de rolagem para o formulário */}
      <div className="w-full sm:w-8/12">
        {' '}
        {/* Defina a altura desejada para o scroll */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full pt-10 m-auto space-y-4">
          {/* Campos de entrada */}
          <div>
            <Label htmlFor="username" className="pb-2">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData?.username || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="name" className="pb-2">
              Nome Completo
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData?.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="pb-2">
              Email
              <FaShieldAlt />
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData?.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="pb-2">
              Telefone
              <FaShieldAlt />
            </Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              value={formData?.phone || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="city" className="pb-2">
              Cidade
            </Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData?.city || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="bio" className="pb-2">
              Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData?.bio || ''}
              onChange={handleChange}
              placeholder="Descreva um pouco sobre você..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPhoneInPDF"
              checked={formData?.showPhoneInPDF || false}
              onCheckedChange={handleCheckboxChange('showPhoneInPDF')}
            />
            <Label htmlFor="showPhoneInPDF">Mostrar telefone no PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showEmailInPDF"
              checked={formData?.showEmailInPDF || false}
              onCheckedChange={handleCheckboxChange('showEmailInPDF')}
            />
            <Label htmlFor="showEmailInPDF">Mostrar e-mail no PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="public"
              checked={formData?.public || false}
              onCheckedChange={handleCheckboxChange('public')}
            />
            <Label htmlFor="public">Tornar público</Label>
          </div>

          <PortfolioEditor
            projects={formData?.portfolio || []}
            setProjects={handlePortfolioChange}
          />

          <GraduationEditor
            graduation={formData?.graduation || []}
            setGraduation={handleGraduationChange}
          />

          <div className="flex justify-end w-full p-4">
            <Button type="submit" className="w-full sm:w-2/12">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
