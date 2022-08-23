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
