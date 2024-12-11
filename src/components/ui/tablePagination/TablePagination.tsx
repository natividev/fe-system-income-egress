import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Flex, TableContainer } from "@chakra-ui/react";
import { useTablePagination } from "@/hook/useTablePagination";
import { useEffect } from "react";
import { FooterPagination } from "./FooterPagination";
import FooterInfo from "./FooterInfo";
import FooterLimit from "./FooterLimit";
import { TableLoading } from "./TableLoading";
import TableBody from "./TableBody";
import { ColApiProyecto } from "@/interface/interfaces";

interface TablePaginationProps {
  columns: ColumnDef<ColApiProyecto>[];
  endpoint: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  columns,
  endpoint,
}) => {
  const {
    endpointUser,
    setEndpointUser,
    state,
    getData,
    getPage,
    firstPage,
    lastPage,
    setLimitPage,
  } = useTablePagination();

  const { data } = state;

  useEffect(() => {
    if (endpoint) setEndpointUser(endpoint);
  }, [endpoint]); //eslint-disable-line

  useEffect(() => {
    getData();
  }, [endpointUser]); //eslint-disable-line

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <TableContainer>
      {state.isLoading ? <TableLoading /> : <TableBody table={table} />}
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
        <FooterPagination
          state={state}
          firstPage={firstPage}
          lastPage={lastPage}
          getPage={getPage}
        />
        <FooterInfo page={state.page} total={state.total} table={table} />
        <FooterLimit
          setLimitPage={setLimitPage}
          limit={state.limit}
          table={table}
        />
      </Flex>
    </TableContainer>
  );
};
