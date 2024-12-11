import { ReactNode } from "react";
import { IconProps } from "@chakra-ui/react";
import {
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { InternalAxiosRequestConfig } from "axios";

export interface InputControllerProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type?: string;
  rules: object;
  placeholder: string;
  children?: ReactNode;
  disabledInput: boolean;
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  showSuccess?: boolean;
  showAlerts?: boolean;
}

export interface ItemSelect {
  label: string;
  value: string;
}
export interface SelectControllerProps<T extends FieldValues> {
  isMulti?: boolean;
  name: Path<T>;
  label: string;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  rules: object;
  placeholder: string;
  disabledInput: boolean;
  endpoint: string;
  isDefaultValue?: boolean;
}

interface NavItem {
  label: string;
  url?: string;
  href?: string;
}
export interface NavItems {
  label: string;
  url?: string;
  icon?: React.FC<IconProps>;
  children?: Array<NavItem>;
  href?: string;
}

interface LabelValue {
  label: string;
  value: number;
}

export interface FormInputs {
  tipoAfiliado: LabelValue | null;
  afiliado: LabelValue | null;
  tipoDocumento: LabelValue | null;
  numDocumento: string;
  actividadEconomica: string;
  telefono: string;
  fechaActividad: string;
  transaccion: string;
  tipoIngreso: LabelValue | null;
  tipoControl: LabelValue | null;
  tipoAportacion?: LabelValue | null;
  cantidad: string;
  observaciones: string;
}

export interface FormInputsInforme {
  desde: "";
  hasta: "";
}

export interface FormInputsAfiliados {
  nombre: string;
  tipoAfiliado: LabelValue | null;
  tipoDocumento: LabelValue | null;
  numDocumento: string;
  fecha: string;
  correo: string;
  telefono: string;
  observaciones: string;
}

export interface resultApi {
  message: string;
}

interface Ubicacion {
  latitud: number;
  longitud: number;
}

export interface FormInputsProyecto {
  nombre: string;
  fecha: string;
  ubicacion: Ubicacion;
  cantidad: number;
  observacion: string;
  tipoParticipante: ItemSelect[];
  categoriaProyectoId: LabelValue | null;
}

export interface FormInputsBitacora {
  fecha: string;
  nombrePersona: string;
  proyectoId: LabelValue | null;
  tipoAporteId: LabelValue | null;
  cantidad: string;
  observaciones: string;
}
