// app/edit-profile/edit.profile.client.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createOrUpdateUser } from '@/lib/user';
import { useEffect, useState } from 'react';
import { Portifolio, UserInput } from '../types/types';
import { toast } from 'sonner';
import { Camera } from 'lucide-react';
import { useUser } from '../context/user.context';
import PortfolioEditor from '@/components/form.portifolio.editor';
import PickColor from '@/components/form.pick.color';
import GraduationEditor from '@/components/form.graduations.editor';
import { FaShieldAlt } from 'react-icons/fa';

export default function EditProfileClient({ props }: { props?: any }) {
  const [message, setMessage] = useState<string | null>(null);
  const { setMyCurriculo } = useUser();
  if (props?.error) {
    return <div className="text-red-600 text-center mt-10">{props?.message}</div>;
  }

  const { phone, email, curriculo, userSession } = props;

  const [formData, setFormData] = useState<UserInput>({
    username: curriculo?.username || '',
    name: curriculo?.name || '',
    email: email || '',
    image: curriculo.image || userSession?.image || '',
    phone: phone || '',
    city: curriculo?.city || '',
    bio: curriculo?.bio || '',
    pickColor: curriculo?.pickColor || 1,
    portfolio: curriculo?.portfolio || [],
    graduation: curriculo?.graduation || [],
    showPhoneInPDF: curriculo?.showPhoneInPDF ?? false,
    showEmailInPDF: curriculo?.showEmailInPDF ?? true,
    public: curriculo?.public ?? false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle para checkboxes com ShadCN
  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // handle para o portfólio
  const handlePortfolioChange = (projects: Portifolio[]) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: projects,
    }));
  };

  // handle para o pickColor
  const handlePickColorChange = (color: number) => {
    setFormData((prev) => ({
      ...prev,
      pickColor: color,
    }));
  };

  // handle para o graduations
  const handleGraduationChange = (graduations: any[]) => {
    setFormData((prev) => ({
      ...prev,
      graduation: graduations,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Dados do formulário:', formData);

    try {
      const payload: UserInput = formData; // certifique-se que formData siga o tipo

      const result = await createOrUpdateUser(payload);
      console.log('Resultado do update:', result);

      // Atualiza o estado do usuário no contexto
      setMyCurriculo(result);
      // Atualiza a mensagem de sucesso
      setMessage(result?.message || 'Atualizado com sucesso!');
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // limpa a mensagem após 5 segundos
  useEffect(() => {
    if (message) {
      if (message.includes('sucesso')) {
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
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-2xl font-bold mb-4">Editar Currículo</h1>
        <p className="text-gray-500 mb-4 bg-1">
          Preencha os campos abaixo para atualizar currículo.
        </p>
      </div>

      {/* Imagem do usuário com ícone de edição */}
      <div className="relative flex justify-center mb-4 w-42 h-42">
        <img
          src={formData.image || '/default-user.svg'}
          alt="User"
          className="w-42 h-42 rounded-full border-2 border-gray-300 object-cover"
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

      <PickColor color={formData?.pickColor || 1} setPickColor={handlePickColorChange} />

      <div className="flex items-center justify-center sm:justify-end mt-2 w-full sm:w-8/12 text-nowrap">
        <FaShieldAlt className='mr-1'/> dados critografados.
      </div>

      {/* Área de rolagem para o formulário */}
      <div className="w-full sm:w-8/12">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col m-auto w-full pt-10">
          {/* Campos de entrada */}
          <div>
            <Label htmlFor="username" className="pb-2">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
              value={formData.name}
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
              value={formData.email}
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
              value={formData.phone}
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
              value={formData.city}
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
              value={formData.bio}
              onChange={handleChange}
              placeholder="Descreva um pouco sobre você..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPhoneInPDF"
              checked={formData.showPhoneInPDF}
              onCheckedChange={handleCheckboxChange('showPhoneInPDF')}
            />
            <Label htmlFor="showPhoneInPDF">Mostrar telefone no PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showEmailInPDF"
              checked={formData.showEmailInPDF}
              onCheckedChange={handleCheckboxChange('showEmailInPDF')}
            />
            <Label htmlFor="showEmailInPDF">Mostrar e-mail no PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="public"
              checked={formData.public}
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

          <div className="flex justify-end">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
