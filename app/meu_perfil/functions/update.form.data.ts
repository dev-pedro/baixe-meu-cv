// src/utils/updateFormData.ts

/**
 * Função que atualiza dados do formulário com base em valores parciais
 * @param setState Função de atualização de estado (setFormData)
 * @param updates Objeto com os campos a serem atualizados
 */
export function updateFormData<T>(setState: React.Dispatch<React.SetStateAction<T>>, updates: Partial<T>) {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  }
  