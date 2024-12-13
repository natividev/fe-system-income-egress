import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import FilterTable from "./FilterTable";
import { flexRender, RowData } from "@tanstack/react-table";
import { Table as ReactTable } from "@tanstack/react-table";
import "react-contexify/dist/ReactContexify.css";
import React from "react";

function TableBody<TData>({
  table,
  rowEvent,
}: {
  table: ReactTable<TData>;
  rowEvent: ({
    event,
    props,
  }: {
    event: React.MouseEvent;
    props: RowData;
  }) => void;
}) {
  return (
    <Table variant="simple">
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {header.column.getIsSorted() && (
                  <span>
                    {header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"}
                  </span>
                )}
                {header.column.getCanFilter() && (
                  <div>
                    <FilterTable column={header.column} table={table} />
                  </div>
                )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            onContextMenu={(e) => {
              e.preventDefault();
              rowEvent({ event: e, props: row });
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TableBody;
