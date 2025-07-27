import { Portfolio } from '@/lib/generated/prisma';
import { updateFormData } from './update.form.data';
import { DataCreateCurriculoForm, Experience, Graduation } from '@/app/types/types';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
type CheckedState = boolean | 'indeterminate';
export const handleChange = (
  setFormData: React.Dispatch<React.SetStateAction<DataCreateCurriculoForm | undefined | null>>,
  e: InputChangeEvent | CheckedState | number | Array<Portfolio | Graduation | Experience>,
  name?: string
) => {
  // Caso seja o ShadCN Checkbox
  if (typeof e === 'boolean' || e === 'indeterminate') {
    console.log(name, e);
    if (!name) return; // nome é obrigatório nesse caso
    updateFormData(setFormData, { [name]: e === true });
    return;
  }

  // Caso seja um número (como no caso de PickColor)
  if (typeof e === 'number') {
    if (!name) return; // nome é obrigatório nesse caso
    updateFormData(setFormData, { [name]: e });
    return;
  }

  if (Array.isArray(e)) {
    if (!name) return; // nome é obrigatório nesse caso
    updateFormData(setFormData, { [name]: [...e] });
    return;
  }

  // Caso seja um input tradicional
  const { name: targetName, type, value } = e.target as HTMLInputElement;
  const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  const finalValue = type === 'checkbox' ? checked : value;

  if (name === 'username' && finalValue && typeof finalValue === 'string') {
    updateFormData(setFormData, { [targetName]: finalValue.toLowerCase() });
  } else {
    updateFormData(setFormData, { [targetName]: finalValue });
  }
};
