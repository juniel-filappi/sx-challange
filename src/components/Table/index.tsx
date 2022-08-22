import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import TableFooter from "./TableFooter";

interface TableProps {
  data: any[];
  rowsPerPage: number;
}

const Table = ({ data, rowsPerPage }: TableProps) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <div className="overflow-x-auto relative rounded-md">
        <table className="w-full text-md text-lef text-white">
          <thead className="text-lg bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-6">Código</th>
              <th className="py-3 px-6">Nome</th>
              <th className="py-3 px-6">CNPJ</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Telefone</th>
              <th className="py-3 px-6">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((el: any) => (
              <tr key={el.id} className="border-b bg-black border-gray-700">
                <td className="py-4 px-6 font-medium whitespace-nowrap text-white">{el.name}</td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">{el.cnpj}</td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">{el.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
