import { Skeleton } from '@/components/ui/skeleton';

export function PerfilBarSkeleton() {
  return (
    <div className="flex items-center gap-2">
      {/* picture perfil skeleton */}
      <Skeleton className="w-40 h-8" />
      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
  );
}
