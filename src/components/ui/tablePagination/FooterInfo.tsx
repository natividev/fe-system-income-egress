"use client";
import { Table as ReactTable } from "@tanstack/react-table";
import { Flex, Input, Text } from "@chakra-ui/react";
import { useTablePagination } from "@/hook/useTablePagination";

function FooterInfo<TData>({
  table,
  page,
  total,
}: {
  table: ReactTable<TData>;
  page: number;
  total: number;
}) {
  const { showPage, setShowPage, handleOnKeyUp } = useTablePagination();

  return (
    <Flex alignItems={"center"}>
      <Text>
        Pag. <strong>{page}</strong> de <strong>{total}</strong>
      </Text>
      <Text ml={1}>
        | Ir a la página:
        <Input
          m={2}
          w={"100px"}
          type="number"
          min="1"
          value={showPage}
          bg={"gray.200"}
          max={table.getPageCount()}
          onChange={(e) => {
            const { value } = e.target;
            setShowPage(value);
          }}
          onKeyUp={handleOnKeyUp}
          isDisabled={total === 1}
        />
      </Text>
    </Flex>
  );
}

export default FooterInfo;
