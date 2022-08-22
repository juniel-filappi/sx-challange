import React, { useEffect } from "react";
import { ICompany } from "../../interfaces/ICompany";

interface TableFooterProps {
  range: number[];
  setPage: (page: number) => void;
  page: number;
  slice: ICompany[];
}

const TableFooter = ({ range, setPage, page, slice }: TableFooterProps) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="py-2 w-full font-medium text-left text-base text-[#2c3e50] rounded-b-2xl flex flex-wrap items-center justify-center">
      {range.map((el, index) => (
        <button
          key={index}
          className={`border-none px-3 py-2 rounded-xl cursor-pointer mx-1 mb-1 hover:bg-bluesx hover:text-white transition-all duration-200 ${
            page === el ? `text-black bg-bluesx` : `text-white bg-black`
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
