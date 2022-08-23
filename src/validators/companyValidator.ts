import { number, object, string } from 'yup'

export const createCompanyValidator = object().shape({
  name: string().required('Nome é obrigatório'),
  email: string().email('Digite um email válido').required('Email é obrigatório'),
  phone: string().required('Telefone é obrigatório'),
  address: string(),
  cnpj: string().required('CNPJ é obrigatório'),
  code: string().required('Código é obrigatório'),
})
export const updateCompanyValidator = object().shape({
  id: number().required('Id é obrigatório'),
  name: string().required('Nome é obrigatório'),
  email: string().email('Digite um email válido').required('Email é obrigatório'),
  phone: string().required('Telefone é obrigatório'),
  address: string(),
  cnpj: string().required('CNPJ é obrigatório'),
  code: string().required('Código é obrigatório'),
})