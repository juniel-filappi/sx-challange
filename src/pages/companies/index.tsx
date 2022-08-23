import Link from "next/link";
import { useRouter } from "next/router";
import { FaIndustry } from "react-icons/fa";
import { Layout } from "../../components/Layout";
import Table from "../../components/Table";
import { ICompany } from "../../interfaces/ICompany";
import { deleteCompany, getCompanies } from "../../services/company";
import { handleError } from "../../utils/error";
import { handleSuccess } from "../../utils/success";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface DashboardProps {
  companies: ICompany[];
}

export default function Companies({ companies }: DashboardProps) {
  const { push, replace, asPath } = useRouter();
  const handleEditCompany = (id: number) => {
    push(`/companies/edit/${id}`);
  };
  const handleDeleteCompany = async (id: number) => {
    try {
      MySwal.fire({
        title: "Você tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
      }).then(async (result) => {
        if (result.value) {
          await deleteCompany(id);
          replace(asPath);
          MySwal.fire({
            title: "Deletado!",
            text: "O seu registro foi deletado.",
            icon: "success",
            toast: true,
            position: "top-end",
          });
        }
      });
    } catch (error) {
      handleError(error, "Não foi possível deletar a empresa");
    }
  };

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
        <Table
          data={companies}
          rowsPerPage={5}
          onEditCompany={handleEditCompany}
          onDeleteCompany={handleDeleteCompany}
        />
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
