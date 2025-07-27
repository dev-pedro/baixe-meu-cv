import { string } from 'zod';

const PICKER_COLORS_HOVER = {
  1: 'hover:bg-pick-1',
  2: 'hover:bg-pick-2',
  3: 'hover:bg-pick-3',
  4: 'hover:bg-pick-4',
  5: 'hover:bg-pick-5',
  6: 'hover:bg-pick-6',
  7: 'hover:bg-pick-7',
} as const;

const PICKER_COLORS_BG = {
  1: 'bg-pick-1/30',
  2: 'bg-pick-2/30',
  3: 'bg-pick-3/30',
  4: 'bg-pick-4/30',
  5: 'bg-pick-5/30',
  6: 'bg-pick-6/30',
  7: 'bg-pick-7/30',
} as const;

const PICKER_COLOR = {
  1: 'pick-1',
  2: 'pick-2',
  3: 'pick-3',
  4: 'pick-4',
  5: 'pick-5',
  6: 'pick-6',
  7: 'pick-7',
} as const;

const STATE_COLOR = {
  1: 'data-[state=checked]:bg-pick-1',
  2: 'data-[state=checked]:bg-pick-2',
  3: 'data-[state=checked]:bg-pick-3',
  4: 'data-[state=checked]:bg-pick-4',
  5: 'data-[state=checked]:bg-pick-5',
  6: 'data-[state=checked]:bg-pick-6',
  7: 'data-[state=checked]:bg-pick-7',
};

/**
 * Retorna a classe de fundo para o picker com base em um número válido (1-7).
 * Se o número for inválido, retorna 'bg-pick-1' como padrão.
 */
export function getPickerBg(pickColor?: number): {
  bg: string;
  hover: string;
  pickColor: string;
  stateColor: string;
} {
  const bg = PICKER_COLORS_BG[pickColor as keyof typeof PICKER_COLORS_BG] ?? 'bg-pick-5';
  const textColor = PICKER_COLOR[pickColor as keyof typeof PICKER_COLOR] ?? 'text-pick-5';
  const stateColor =
    STATE_COLOR[pickColor as keyof typeof STATE_COLOR] ?? 'data-[state=checked]:bg-pick-5';
  const hover =
    PICKER_COLORS_HOVER[pickColor as keyof typeof PICKER_COLORS_HOVER] ?? 'hover:bg-pick-5';

  return { bg: `${bg}`, hover: `${hover}`, pickColor: textColor, stateColor };
}
