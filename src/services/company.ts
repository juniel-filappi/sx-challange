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
  const { data } = await api.get("/companies");

  return data;
};

export const createCompany = async (company: Omit<CompanyData, "id">) => {
  const { data } = await api.post("/companies/create", company);

  return data;
};

export const showCompany = async (id: number) => {
  const { data } = await api.get(`/companies/edit/${id}`);

  return data;
}

export const updateCompany = async (company: CompanyData) => {
  const { data } = await api.put(`/companies/edit/${company.id}`, company);

  return data;
}

export const deleteCompany = async (id: number) => {
  const { data } = await api.delete(`/companies/delete/${id}`);

  return data;
}