import { number, object, string } from 'yup'
export const createColaboratorValidator = object().shape({
  name: string().required('Nome é obrigatório'),
  email: string().email('Digite um email válido').required('Email é obrigatório'),
  phone: string().required('Telefone é obrigatório'),
  address: string(),
  cpf: string().required('CNPJ é obrigatório'),
  code: string().required('Código é obrigatório'),
  companyId: number().required('Id da empresa é obrigatório'),
})
export const updateColaboratorValidator = object().shape({
  id: number().required('Id é obrigatório'),
  name: string().required('Nome é obrigatório'),
  email: string().email('Digite um email válido').required('Email é obrigatório'),
  phone: string().required('Telefone é obrigatório'),
  address: string(),
  cpf: string().required('CNPJ é obrigatório'),
  code: string().required('Código é obrigatório'),
  companyId: number().required('Id da empresa é obrigatório'),
})