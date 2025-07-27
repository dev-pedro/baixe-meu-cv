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
import { useUser } from '../context/user.context';
import PortfolioEditor from '@/components/form-components/form.portifolio.editor';
import PickColor from '@/components/form-components/form.pick.color';
import GraduationEditor from '@/components/form-components/form.graduations.editor';
import { FaShieldAlt } from 'react-icons/fa';
import { IoCloud, IoCloudOffline } from 'react-icons/io5';
import { handleChange } from './functions/handle.change';
import { ProfileSkeleton } from '@/components/form-components/form.skeleton.user.perfil';
import { checkUsernameRegex } from './functions/check.username.regex';
import ExperienceEditor from '@/components/form-components/form.experiences.editor';
import CourseEditor from '@/components/form-components/form.courses.editor';
import { getPickerBg } from '@/utils/colors';
import NextImage from 'next/image';
import { handleImageUpload } from './functions/handle.image.uploaded';

export default function EditProfileClient({
  userSession,
  message,
}: {
  userSession?: UserSession;
  message?: string;
}) {
  //const { profile, message, error } = userProfile || {};
  const [formData, setFormData] = useState<DataCreateCurriculoForm | null | undefined>();
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const { setProfile, dataProfile, loading } = useUser();
  const [isLocalData, setIsLocalData] = useState<boolean>();
  const { stateColor } = getPickerBg(formData?.pickColor || 1);

  useEffect(() => {
    if (!loading && dataProfile?.profile) {
      const profile = dataProfile.profile;

      setFormData({
        username: profile.username || '',
        name: profile.name || '',
        email: userSession?.email || '',
        phone: profile.phone || '',
        image: profile.image || '',
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
  }, [loading, dataProfile, userSession]);

  // limpa a mensagem após 5 segundos
  useEffect(() => {
    if (!loading && dataProfile?.message) {
      // Exibe a mensagem de sucesso ou erro
      if (dataProfile.message.includes('Username já está em uso.')) {
        setUsernameError(dataProfile.message);
      }
      if (dataProfile?.message.includes('sucesso!')) {
        setIsLocalData(false);
        toast.success(dataProfile?.message, {
          closeButton: true,
          duration: 5000,
          className: '!text-green-700',
        });
      } else if (dataProfile?.message && dataProfile?.message.includes('localmente')) {
        toast.warning(dataProfile?.message, {
          closeButton: true,
          duration: 5000,
          className: '!text-orange-500',
        });
        setIsLocalData(true);
      } else {
        toast.error(dataProfile?.message, {
          closeButton: true,
          duration: 5000,
          className: '!text-red-700',
        });
      }
      dataProfile.message = null; // Limpa a mensagem após exibir
    }
  }, [dataProfile, loading]);

  // Verifica se o username atinje os critérios
  const handleUsernameBlur = () => {
    if (formData?.username && !checkUsernameRegex(formData.username)) {
      setUsernameError(
        "Username inválido. Use apenas letras, números, '.', '-', '_'. Não inicie ou termine com símbolos. Sem repetições como '__', '..', '--'."
      );
    } else {
      setUsernameError(null);
    }
  };

  // Atualiza o estado do username
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError(null); // Limpa o erro ao digitar
    // Atualiza o estado do username
    handleChange(setFormData, e, 'username');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se o username é válido antes de enviar
    if (formData?.username && !checkUsernameRegex(formData.username)) {
      setUsernameError(
        "Username inválido. Use apenas letras, números, '.', '-', '_'. Não inicie ou termine com símbolos. Sem repetições como '__', '..', '--'."
      );
      toast.error('Por favor, corrija o erro no username antes de salvar.');
      return;
    }

    // Se o username for válido, prossegue com o envio
    try {
      const payload: DataCreateCurriculoForm = {
        ...formData,
        email: userSession?.email || formData?.email || '',
        showPhoneInPDF: formData?.showPhoneInPDF || false,
        showEmailInPDF: formData?.showEmailInPDF || false,
        public: formData?.public || false,
      }; // certifique-se que formData siga o tipo

      //Cria umsnapshop para evitar conflito de dados
      const profileSnapshot = JSON.parse(JSON.stringify(dataProfile?.profile || null));
      const result = await createOrUpdateUser(payload, profileSnapshot);

      if (result?.profile) {
        setFormData(result.profile);
        setProfile(result);
      }
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

  return (
    <div className="flex flex-col items-center justify-center p-4 mx-auto overflow-hidden md:overflow-hidden">
      {/* Imagem do usuário com ícone de edição */}
      <div className="relative flex justify-center mb-4 w-42 h-42">
        <NextImage
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
            onChange={(e) => handleImageUpload(e.target.files?.[0], setFormData)}
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

      {/* Indicador de onde os dados estão sendo salvos */}
      <div className="flex flex-col items-center justify-center w-full my-2 sm:flex-row sm:justify-between sm:w-8/12">
        {isLocalData ? (
          <div className="flex items-center">
            <IoCloudOffline className="mr-1 text-nowrap" /> Dados salvos localmente
          </div>
        ) : (
          <div className="flex items-center">
            <IoCloud className="mr-1 text-nowrap" /> Dados salvos na nuvem
          </div>
        )}
        <div className="flex items-center">
          <FaShieldAlt className="mr-1 text-nowrap" /> dados criptografados
        </div>
      </div>

      {/* Sua Url personalizada */}
      <div>
        <p className="text-lg text-center text-gray-500">
          Link para seu currículo:{' '}
          <span className="font-bold">baixemeucv.com.br/{formData?.username}</span>
        </p>
      </div>

      {/* Área de rolagem para o formulário */}
      <div className="w-full sm:w-8/12">
        {' '}
        {/* Defina a altura desejada para o scroll */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full pt-10 m-auto space-y-4">
          {/* Campos de entrada */}
          <div>
            <Label htmlFor="username" className="pb-2 sm:text-lg">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              maxLength={30}
              placeholder="Ex: pedro-henrique"
              value={formData?.username || ''}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              aria-invalid={!!usernameError}
              className={`${usernameError ? 'border-2 border-red-500' : ''} !text-base`}
              required
            />
            {usernameError && <p className="mt-1 text-sm text-red-500">{usernameError}</p>}
          </div>
          <div>
            <Label htmlFor="name" className="pb-2 sm:text-lg">
              Nome Completo
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              maxLength={70}
              value={formData?.name || ''}
              onChange={(e) => handleChange(setFormData, e, 'name')}
              className="!text-base"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="pb-2 sm:text-lg">
              Email
              <FaShieldAlt />
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              maxLength={50}
              value={userSession?.email || ''}
              //onChange={(e) => handleChange(setFormData, e, 'email')}
              readOnly
              className="!text-base"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="pb-2 sm:text-lg">
              Telefone
              <FaShieldAlt />
            </Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              maxLength={30}
              value={formData?.phone || ''}
              onChange={(e) => handleChange(setFormData, e, 'phone')}
              className="!text-base"
            />
          </div>
          <div>
            <Label htmlFor="city" className="pb-2 sm:text-lg">
              Cidade
            </Label>
            <Input
              type="text"
              id="city"
              name="city"
              maxLength={50}
              value={formData?.city || ''}
              onChange={(e) => handleChange(setFormData, e, 'city')}
              className="!text-base"
            />
          </div>
          <div>
            <Label htmlFor="bio" className="pb-2 sm:text-lg">
              Bio
            </Label>
            <Textarea
              className={`resize-none !text-base`}
              id="bio"
              name="bio"
              maxLength={700}
              value={formData?.bio || ''}
              placeholder="Descreva um pouco sobre você..."
              onChange={(e) => handleChange(setFormData, e, 'bio')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPhoneInPDF"
              checked={formData?.showPhoneInPDF || false}
              onCheckedChange={(checked) => handleChange(setFormData, checked, 'showPhoneInPDF')}
              className={`w-6 h-6 ${stateColor}`}
            />
            <Label htmlFor="showPhoneInPDF" className="sm:text-lg">
              Mostrar telefone no PDF
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showEmailInPDF"
              checked={formData?.showEmailInPDF || false}
              onCheckedChange={(checked) => handleChange(setFormData, checked, 'showEmailInPDF')}
              className={`w-6 h-6 ${stateColor}`}
            />
            <Label htmlFor="showEmailInPDF" className="sm:text-lg">
              Mostrar e-mail no PDF
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="public"
              checked={formData?.public || false}
              onCheckedChange={(checked) => handleChange(setFormData, checked, 'public')}
              className={`w-6 h-6 ${stateColor}`}
            />
            <Label htmlFor="public" className="sm:text-lg">
              Tornar público
            </Label>
          </div>

          <PortfolioEditor
            projects={formData?.portfolio || []}
            pickColor={formData?.pickColor || 1}
            setProjects={(e) => handleChange(setFormData, e, 'portfolio')}
          />

          <GraduationEditor
            graduation={formData?.graduation || []}
            pickColor={formData?.pickColor || 1}
            setGraduation={(e) => handleChange(setFormData, e, 'graduation')}
          />

          <ExperienceEditor
            experience={formData?.experiences || []}
            pickColor={formData?.pickColor || 1}
            setExperience={(e) => handleChange(setFormData, e, 'experiences')}
          />

          <CourseEditor
            courses={formData?.courses || []}
            setCourses={(e) => handleChange(setFormData, e, 'courses')}
            pickColor={formData?.pickColor || 1}
          />

          <div className="flex justify-end w-full p-4">
            <Button type="submit" variant="default" className={`w-full sm:w-2/12`}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
