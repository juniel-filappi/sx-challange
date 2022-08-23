import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { Layout } from "../../components/Layout";
import { getColaborators } from "../../services/colaborator";
import { IColaborator } from "../../interfaces/IColaborators";
import TableColaborator from "../../components/TableColaborator";

interface DashboardProps {
  colaborators: IColaborator[];
}

export default function Colaborators({ colaborators }: DashboardProps) {
  return (
    <Layout title="Colaboradores">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl flex">
            <FaUsers className="mr-2" />
            Colaboradores
          </h1>
          <p>Lista de colaboradores cadastrados</p>
        </div>
        <div>
          <Link href="/colaborators/create">
            <button className="border-none px-4 py-2 rounded-xl cursor-pointer mx-1 mb-1 text-black bg-bluesx hover:brightness-75 transition-all duration-200">
              Cadastrar <span className="hidden md:block">Colaborador</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <TableColaborator data={colaborators} rowsPerPage={5} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const colaborators = await getColaborators();

  return {
    props: {
      colaborators,
    },
  };
}
