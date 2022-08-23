import { getAllNumbers } from "../utils/helpers";
import { api } from "./api";

interface CompanyData {
  id: number;
  code: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
}

export const getCompanies = async () => {
  const { data } = await api.get("/api/companies");

  return data;
};

export const createCompany = async (company: Omit<CompanyData, "id">) => {
  const { data } = await api.post("/api/companies/create", company);

  return data;
};

export const showCompany = async (id: number) => {
  const { data } = await api.get(`/api/companies/edit/${id}`);

  return data;
};

export const updateCompany = async (company: CompanyData) => {
  const { data } = await api.put(`/api/companies/edit/${company.id}`, company);
  console.log(data);
  return data;
};

export const deleteCompany = async (id: number) => {
  const { data } = await api.delete(`/api/companies/delete/${id}`);

  return data;
};
