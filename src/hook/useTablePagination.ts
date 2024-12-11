import axiosInstance from "@/api/axiosInstance";
import { ColApiProyecto } from "@/interface/interfaces";
import {
  showAlertError,
  showAlertLoading,
  showAlertSuccess,
} from "@/utils/Alerts/Alerts";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useContextMenu, ItemParams } from "react-contexify";

// Tipos
interface Page {
  next: number | null;
  prev: number | null;
  count: number;
}

interface FacturasResponse {
  data: ColApiProyecto[];
  total: number;
  page: Page;
}

export interface initialStatePagination {
  next: number;
  prev: number;
  page: number;
  total: number;
  limit: number;
  data: ColApiProyecto[];
  typeDET: string;
  isLoading: boolean;
}

export const useTablePagination = () => {
  const [state, setState] = useState<initialStatePagination>({
    next: 0,
    prev: 0,
    page: 0,
    total: 0,
    limit: 10,
    data: [],
    typeDET: "",
    isLoading: false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endpointUser, setEndpointUser] = useState<string | null>(null);
  const [urlPdf, setUrlPdf] = useState("");
  const [modalEmail, setModalEmail] = useState<boolean>(false);
  const [showPage, setShowPage] = useState("");
  const [codigoGeneracion, setCodigoGeneracion] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoadingEmail, setIsLoadingEmail] = useState<boolean>(false);

  const MENU_ID = "factura_context_menu";
  const { show } = useContextMenu({ id: MENU_ID });

  const endpoint = (page: number, limit: number) => {
    return `${endpointUser}?limit=${limit}&page=${page}`;
  };

  const setLoading = (isLoading: boolean) =>
    setState((prevState) => ({ ...prevState, isLoading }));

  const updateStateWithData = (result: FacturasResponse, limit: number) => {
    const { page, data } = result;
    const { next, prev, count } = page;

    setState((prevState) => ({
      ...prevState,
      next: next ?? 0,
      prev: prev ?? 0,
      page: next ? next - 1 : prev ? prev + 1 : 1,
      total: count,
      data: data.length ? data : [],
      limit,
      isLoading: false,
    }));
  };

  const fetchData = async (page: number = 1, limit: number = state.limit) => {
    try {
      setLoading(true);
      if (!endpointUser) return;
      const { data: result } = await axiosInstance.get(endpoint(page, limit));
      if (result) updateStateWithData(result, limit);
    } catch (error) {
      console.log({ error });
      showAlertError("Error al obtener datos de la API");
    } finally {
      setLoading(false);
    }
  };

  const getData = () => fetchData();

  const getPage = (pageNumber: number) => fetchData(pageNumber);

  const firstPage = () => getPage(1);

  const lastPage = () => getPage(state.total);

  const setLimitPage = (newLimit: number) => {
    setState((prevState) => ({ ...prevState, limit: newLimit }));
    fetchData(1, newLimit);
  };

  const printReceipt = async (codigoGeneracion: string) => {
    const textAlert = "Generando el comprobante, por favor espera";
    showAlertLoading(textAlert, true);
    try {
      const { data } = await axiosInstance.get(
        `/factura-electronica/generar-factura?codigoGeneracion=${codigoGeneracion}`,
        { responseType: "arraybuffer" }
      );
      if (data) {
        const urlBlob = window.URL.createObjectURL(
          new Blob([data], { type: "application/pdf" })
        );
        setUrlPdf(urlBlob);
        onOpen();
        showAlertSuccess("Comprobante generado exitosamente", false);
      }
    } catch (error) {
      console.log({ error });
      showAlertError("Hubo un problema al generar el comprobante");
    } finally {
      showAlertLoading(textAlert, false);
    }
  };

  const sendFactura = async (codigoGeneracion: string) => {
    const textAlert = "Enviando la factura, por favor espera";
    showAlertLoading(textAlert, true);
    setIsLoadingEmail(true);
    try {
      const payloafd = {
        email,
      };
      const { data } = await axiosInstance.post(
        `/factura-electronica/send-factura?codigoGeneracion=${codigoGeneracion}`,
        payloafd
      );
      if (data) {
        setIsLoadingEmail(false);
        showAlertSuccess(data?.message || "Factura enviada exitosamente", true);
      }
    } catch (error) {
      console.log({ error });
      setIsLoadingEmail(false);
      showAlertError("Hubo un problema al enviar la factura");
    } finally {
      showAlertLoading(textAlert, false);
      setIsLoadingEmail(false);
    }
  };

  const handleItemClick = ({ props }: ItemParams<ColApiProyecto>) => {
    //if (props) printReceipt(props.codigo_generacion);
  };

  const handleCItemEnviarFactura = () => {
    if (codigoGeneracion) sendFactura(codigoGeneracion);
  };

  const handleSentEmail = ({ props }: ItemParams<ColApiProyecto>) => {
    /* if (!props) {
      return showAlertError("Error al obtener el codigo  de generación");
    }
    setModalEmail(true);
    setEmail(props.jsondte.documento.receptor.correo);
    setCodigoGeneracion(props.codigo_generacion); */
  };

  const isValidPage = () => {
    let isValid = true;
    if (Number(showPage) > state.total) {
      isValid = false;
    }

    return isValid;
  };

  const handleCloseModalEmail = () => {
    setEmail("");
    setCodigoGeneracion("");
    setModalEmail(false);
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!isValidPage()) {
      return showAlertError("La pagina que solicita no existe");
    }

    getPage(Number(showPage));
    setShowPage("");
  };

  return {
    endpointUser,
    setEndpointUser,
    state,
    setState,
    email,
    setEmail,
    handleCloseModalEmail,
    isLoadingEmail,
    modalEmail,
    setModalEmail,
    codigoGeneracion,
    setCodigoGeneracion,
    showPage,
    setShowPage,
    getData,
    getPage,
    firstPage,
    lastPage,
    setLimitPage,
    show,
    MENU_ID,
    urlPdf,
    setUrlPdf,
    isOpen,
    onClose,
    handleItemClick,
    handleSentEmail,
    handleOnKeyUp,
    handleCItemEnviarFactura,
  };
};
