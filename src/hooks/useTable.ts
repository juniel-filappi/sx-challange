import { useState, useEffect } from "react";
import { ICompany } from "../interfaces/ICompany";

const calculateRange = (data: ICompany[], rowsPerPage: number) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data: ICompany[], page: number, rowsPerPage: number) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data: ICompany[], page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<ICompany[]>([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

export default useTable;
