import { GetServerSideProps } from "next";
import { FaIndustry } from "react-icons/fa";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import Table from "../../components/Table";
import { api } from "../../services/api";
import { getCompanies } from "../../services/company";

export default function Dashboard() {
  const columns = [
    {
      id: 1,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 2,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 3,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 4,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 5,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 6,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 7,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 8,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 9,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 10,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 11,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 12,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
    {
      id: 13,
      name: "Company",
      address: "Avenida",
      cnpj: "CNPJ",
      phone: "Phone",
    },
  ];
  return (
    <Layout title="Empresas">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl flex">
            <FaIndustry className="mr-2" />
            Empresas
          </h1>
          <p>Lista de empresas cadastradas</p>
        </div>
        <div>
          <Button>Cadastrar Empresa</Button>
        </div>
      </div>

      <div className="mt-10">
        <Table data={columns} rowsPerPage={5} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const companies = await getCompanies();

  return {
    props: {
      companies,
    },
  };
}
