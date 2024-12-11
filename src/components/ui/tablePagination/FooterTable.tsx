import { useTablePagination } from "@/hook/useTablePagination";
import { Button, Flex } from "@chakra-ui/react";

export const FooterPagination = () => {
  const { state, firstPage, lastPage, getPage } = useTablePagination();
  const { next, prev } = state;

  return (
    <Flex>
      <Button colorScheme="blue" onClick={() => firstPage()} isDisabled={!prev}>
        {"<<"}
      </Button>
      <Button
        colorScheme="blue"
        onClick={() => getPage(prev)}
        isDisabled={!prev}
        mx={2}
      >
        {"<"}
      </Button>
      <Button
        colorScheme="blue"
        onClick={() => getPage(next)}
        isDisabled={!next}
        mx={2}
      >
        {">"}
      </Button>
      <Button colorScheme="blue" onClick={() => lastPage()} isDisabled={!next}>
        {">>"}
      </Button>
    </Flex>
  );
};
