import { Flex, Input } from "@chakra-ui/react";
import { Column, Table } from "@tanstack/react-table";

function FilterTable<TData>({
  column,
  table,
}: {
  column: Column<TData>;
  table: Table<TData>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <Flex onClick={(e) => e.stopPropagation()}>
      <Input
        variant="flushed"
        type="number"
        mr={2}
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
      />
      <Input
        variant="flushed"
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
      />
    </Flex>
  ) : (
    <Input
      variant="flushed"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}

export default FilterTable