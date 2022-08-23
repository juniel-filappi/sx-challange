import { ICompany } from "./ICompany";

export interface IColaborator {
  id: number;
  name: string;
  code: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  companyId: number;
  company?: ICompany;
  createdAt: string;
  updatedAt: string;
}