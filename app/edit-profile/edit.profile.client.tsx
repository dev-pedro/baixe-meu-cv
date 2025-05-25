// app/edit-profile/edit.profile.client.tsx
'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createOrUpdateUser } from '@/lib/user';
import { UserSession, DataCreateCurriculoForm } from '../types/types';
import { toast } from 'sonner';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '../context/user.context';
import PortfolioEditor from '@/components/form.portifolio.editor';
import PickColor from '@/components/form.pick.color';
import GraduationEditor from '@/components/form.graduations.editor';
import { FaShieldAlt } from 'react-icons/fa';
import { IoCloud, IoCloudOffline } from 'react-icons/io5';
import { handleChange } from './functions/handle.change';
import { ProfileSkeleton } from '@/components/form.skeleton.user.perfil';

export default function EditProfileClient({ userSession }: { userSession?: UserSession }) {
  //const { profile, message, error } = userProfile || {};
  const [formData, setFormData] = useState<DataCreateCurriculoForm>();
  const { setMyCurriculo, myCurriculo, loading } = useUser();
  const [isLocalData, setIsLocalData] = useState<boolean>();

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
    if (!loading && myCurriculo?.message) {
      if (myCurriculo?.message.includes('sucesso!')) {
        setIsLocalData(false);
        toast.success(myCurriculo?.message, {
          closeButton: true,
          duration: 5000,
          className: '!text-green-700',
        });
      } else if (myCurriculo?.message && myCurriculo?.message.includes('localmente')) {
        toast.warning(myCurriculo?.message, {
          closeButton: true,
          duration: 5000,
          className: '!text-orange-500',
        });
        setIsLocalData(true);
      } else {
        toast.error(myCurriculo?.message, {
          closeButton: true,
          duration: 5000,
          className: '!text-red-700',
        });
      }
    }
  }, [myCurriculo, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload: DataCreateCurriculoForm = formData || null; // certifique-se que formData siga o tipo

      const result = await createOrUpdateUser(payload);

      if (result?.profile) {
        setFormData({
          ...result.profile, // atualiza campos modificados pelo backend, se houver
        });
      }

      setMyCurriculo(result);
      // Atualiza o estado do usuário no contexto
    } catch (err) {
      if (err instanceof Error) {
        console.error(err?.message);
        toast.error(err.message);
      }
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  console.log(formData)

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
                  setFormData((prev) => ({
                    ...prev!,
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

      <PickColor
        color={formData?.pickColor || 1}
        setPickColor={(e) => handleChange(setFormData, e, 'pickColor')}
      />

      <div className="flex flex-col items-center justify-center w-full mt-2 sm:flex-row sm:justify-between sm:w-8/12">
        {isLocalData ? (
          <div className="flex items-center">
            <IoCloudOffline className="mr-1 text-nowrap" /> Dados salvos localmente
          </div>
        ) : (
          <div className="flex items-center">
            <IoCloud className="mr-1 text-nowrap" /> Dados serão salvos na nuvem
          </div>
        )}
        <div className="flex items-center">
          <FaShieldAlt className="mr-1 text-nowrap" /> dados protegidos
        </div>
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
              onChange={(e) => handleChange(setFormData, e, 'username')}
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
              onChange={(e) => handleChange(setFormData, e, 'name')}
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
              onChange={(e) => handleChange(setFormData, e, 'email')}
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
              onChange={(e) => handleChange(setFormData, e, 'phone')}
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
              onChange={(e) => handleChange(setFormData, e, 'city')}
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
              onChange={(e) => handleChange(setFormData, e, 'bio')}
              placeholder="Descreva um pouco sobre você..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPhoneInPDF"
              checked={formData?.showPhoneInPDF || false}
              onCheckedChange={(checked) => handleChange(setFormData, checked, 'showPhoneInPDF')}
            />
            <Label htmlFor="showPhoneInPDF">Mostrar telefone no PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showEmailInPDF"
              checked={formData?.showEmailInPDF || false}
              onCheckedChange={(checked) => handleChange(setFormData, checked, 'showEmailInPDF')}
            />
            <Label htmlFor="showEmailInPDF">Mostrar e-mail no PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="public"
              checked={formData?.public || false}
              onCheckedChange={(checked) => handleChange(setFormData, checked, 'public')}
            />
            <Label htmlFor="public">Tornar público</Label>
          </div>

          <PortfolioEditor
            projects={formData?.portfolio || []}
            pickColor={formData?.pickColor || 1}
            setProjects={(e) => handleChange(setFormData, e, 'portfolio')}
          />

          <GraduationEditor
            graduation={formData?.graduation || []}
            setGraduation={(e) => handleChange(setFormData, e, 'graduation')}
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
