export const checkUsernameRegex = (username: string): boolean => {
  // Critério 1, 2 e 3: valida os caracteres, início/fim e tamanho.
  const baseRegex = /^(?![_\.\-])[a-zA-Z0-9._-]{3,30}(?<![_\.\-])$/;

  if (!baseRegex.test(username)) {
    return false;
  }

  // Critério 4: não pode ter sequências repetidas de símbolos.
  const repeatedSymbolsRegex = /(\.\.|__|--)/;

  if (repeatedSymbolsRegex.test(username)) {
    return false;
  }

  return true;
};
