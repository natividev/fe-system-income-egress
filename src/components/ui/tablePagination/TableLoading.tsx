import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export const TableLoading = () => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
            <Skeleton height="30px" />
          </Th>
          <Th>
            <Skeleton height="30px" />
          </Th>
          <Th>
            <Skeleton height="30px" />
          </Th>
          <Th>
            <Skeleton height="30px" />
          </Th>
          <Th>
            <Skeleton height="30px" />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
        </Tr>{" "}
        <Tr>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
        </Tr>{" "}
        <Tr>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
        </Tr>{" "}
        <Tr>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
        </Tr>{" "}
        <Tr>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
          <Td>
            <Skeleton height="30px" />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
