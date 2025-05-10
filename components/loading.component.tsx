import { Skeleton } from '@/components/ui/skeleton';
import { Camera } from 'lucide-react';

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center p-4 mx-auto overflow-hidden md:overflow-hidden">
      <div className="flex flex-col items-center w-full px-4">
        {/* Imagem com ícone de edição */}
        <div className="relative flex justify-center mb-4 w-42 h-42">
          <Skeleton className="rounded-full w-42 h-42 " />
          <div className="absolute bottom-2 right-[5%] bg-white p-2 rounded-full shadow-md">
            <Camera className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Título e descrição */}
        <Skeleton className="w-40 h-6 mb-2" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-4 bg-transparent w-72 text-c">Carregando seus dados...</Skeleton>
      </div>
      <div className="flex flex-col items-center w-full h-screen pt-10 sm:w-8/12">
        <Skeleton className="w-full h-full bg-transparent" />
      </div>
    </div>
  );
}
