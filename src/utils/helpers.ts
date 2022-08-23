export const setMaskPhone = (phone?: string) => {
  if (phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return "";
};

export const setMaskCnpj = (cnpj?: string) => {
  if (cnpj) {
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return "";
};

export const setMaskCpf = (cnpj?: string) => {
  if (cnpj) {
    return cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return "";
};

export const getAllNumbers = (text?: string) => {
  if (text) {
    return text.replace(/\D/g, "");
  }

  return "";
};

export const validateCpf = (cpf?: string) => {
  if (cpf) {
    const cpfNumbers = getAllNumbers(cpf);
    if (cpfNumbers.length !== 11) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpfNumbers.charAt(i)) * (10 - i);
    }
    let rest = sum % 11;
    if (rest < 2) {
      rest = 0;
    } else {
      rest = 11 - rest;
    }
    if (rest !== parseInt(cpfNumbers.charAt(9))) {
      return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpfNumbers.charAt(i)) * (11 - i);
    }
    rest = sum % 11;
    if (rest < 2) {
      rest = 0;
    } else {
      rest = 11 - rest;
    }
    if (rest !== parseInt(cpfNumbers.charAt(10))) {
      return false;
    }
    return true;
  }

  return false;
}