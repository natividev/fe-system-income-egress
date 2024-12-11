"use client";
import { Table as ReactTable } from "@tanstack/react-table";
import { Select } from "@chakra-ui/react";

function FooterLimit<TData>({
  table,
  setLimitPage,
  limit,
}: {
  table: ReactTable<TData>;
  setLimitPage: (page: number) => void;
  limit: number;
}) {
  
  return (
    <Select
      w={"150px"}
      value={limit}
      onChange={(e) => {
        setLimitPage(Number(e.target.value));
        table.setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Mostrar {pageSize}
        </option>
      ))}
    </Select>
  );
}

export default FooterLimit;
