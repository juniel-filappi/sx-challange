import Link from "next/link";
import { FaIndustry } from "react-icons/fa";
import { Layout } from "../../components/Layout";
import Table from "../../components/Table";
import { ICompany } from "../../interfaces/ICompany";
import { getCompanies } from "../../services/company";

interface DashboardProps {
  companies: ICompany[];
}

export default function Dashboard({ companies }: DashboardProps) {
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
          <Link href="/companies/create">
            <button className="border-none px-4 py-2 rounded-xl cursor-pointer mx-1 mb-1 text-black bg-bluesx hover:brightness-75 transition-all duration-200">
              Cadastrar Empresa
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <Table data={companies} rowsPerPage={5} />
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
