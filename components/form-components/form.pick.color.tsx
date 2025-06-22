'use client';

import { colorPalette } from '@/app/data/colors';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  color: number | null; // null se nenhuma cor estiver selecionada
  setPickColor: (color: number) => void;
}

export default function PickColor({ color, setPickColor }: Props) {
  return (
    <div className="pt-2 space-y-4 border-t">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Cor de destaque</h2>
          <p className="text-xs text-muted-foreground">
            Selecione uma cor de realce para a página de seu currículo.
          </p>
        </div>
        <div
          className="w-6 h-6 ml-4 border rounded-full"
          style={{ backgroundColor: color !== null ? colorPalette[color - 1] : 'transparent' }}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {colorPalette.map((colorHex, index) => {
          const selected = color === index + 1;
          return (
            <Button
              key={index}
              variant="outline"
              size="icon"
              aria-pressed={selected}
              onClick={(e) => {
                e.preventDefault();
                setPickColor(index + 1);
              }}
              className={cn(
                'rounded-full p-0 w-8 h-8 border-2 transition-all',
                selected ? 'ring-2 ring-offset-2 ring-black' : 'border-input hover:border-black'
              )}
              style={{ backgroundColor: colorHex }}
            />
          );
        })}
      </div>
    </div>
  );
}
