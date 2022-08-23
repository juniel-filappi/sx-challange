import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import { ICompany } from "../../interfaces/ICompany";
import { setMaskCnpj, setMaskPhone } from "../../utils/helpers";
import { BiPencil, BiTrash } from "react-icons/bi";
import TableFooter from "./TableFooter";
import { IconButton } from "../IconButton";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { deleteCompany } from "../../services/company";
import { handleError } from "../../utils/error";

const MySwal = withReactContent(Swal);

interface TableProps {
  data: ICompany[];
  rowsPerPage: number;
}

const TableCompany = ({ data, rowsPerPage }: TableProps) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  const { push, replace, asPath } = useRouter();
  const handleEditCompany = (id: number) => {
    push(`/companies/edit/${id}`);
  };
  const handleDeleteCompany = async (id: number) => {
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
        try {
          await deleteCompany(id);
          replace(asPath);
          MySwal.fire({
            title: "Deletado!",
            text: "O seu registro foi deletado.",
            icon: "success",
            toast: true,
            position: "top-end",
          });
        } catch (error) {
          handleError(error, "Não foi possível deletar a empresa");
        }
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto relative rounded-md">
        <table className="w-full text-md text-center text-white">
          <thead className="text-lg bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-6"></th>
              <th className="py-3 px-6">Código</th>
              <th className="py-3 px-6">Nome</th>
              <th className="py-3 px-6">CNPJ</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Telefone</th>
              <th className="py-3 px-6">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((el) => (
              <tr key={el.id} className="border-b bg-black border-gray-700">
                <td className="py-4 px-6 font-medium whitespace-nowrap text-white">
                  <IconButton onClick={() => handleEditCompany(el.id)}>
                    <BiPencil />
                  </IconButton>
                  <IconButton
                    className="ml-2 hover:bg-red-500"
                    onClick={() => handleDeleteCompany(el.id)}
                  >
                    <BiTrash />
                  </IconButton>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-white">
                  {el.code}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-white">
                  {el.name}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">
                  {setMaskCnpj(el.cnpj)}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">
                  {el.email}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">
                  {setMaskPhone(el.phone)}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">
                  {el.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TableCompany;
