import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import FilterTable from "./FilterTable";
import { flexRender } from "@tanstack/react-table";
import { Table as ReactTable } from "@tanstack/react-table";
import { Item, Menu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useTablePagination } from "@/hook/useTablePagination";
import BtnLoading from "../btnLoading/BtnLoading";

function TableBody<TData>({ table }: { table: ReactTable<TData> }) {
  const {
    email,
    setEmail,
    isLoadingEmail,
    modalEmail,
    handleCloseModalEmail,
    show,
    MENU_ID,
    onClose,
    isOpen,
    urlPdf,
    setUrlPdf,
    handleSentEmail,
    handleItemClick,
    handleCItemEnviarFactura,
  } = useTablePagination();

  return (
    <>
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
                show({ event: e, props: row.original });
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

      {/* Menú contextual */}
      {/*  <Menu id={MENU_ID}>
        <Item onClick={handleItemClick}>IMPRIMIR</Item>
        <Item onClick={handleSentEmail}>ENVIAR FACTURA ELECTRÓNICA</Item>
      </Menu>
 */}
      <Modal
        isCentered
        onClose={() => {
          setUrlPdf("");
          onClose();
        }}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent width={"90%"} height={"90vh"}>
          <ModalHeader>Detalles de la Factura</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              title="COMPROBANTE"
              src={urlPdf}
              height="100%"
              width="100%"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setUrlPdf("");
                onClose();
              }}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        onClose={handleCloseModalEmail}
        isOpen={modalEmail}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar correo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Correo</FormLabel>
              <Input
                placeholder="ejemplo@gmail.com"
                value={email}
                type="email"
                isDisabled={isLoadingEmail}
                onChange={(e) => {
                  const { value } = e.target;
                  setEmail(value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <BtnLoading
              onSubmit={handleCItemEnviarFactura}
              isLoading={isLoadingEmail}
              text={"Enviar"}
              textLoading={"Enviado factura..."}
              mx="3"
            />
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={isLoadingEmail}
              onClick={() => handleCloseModalEmail()}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TableBody;
