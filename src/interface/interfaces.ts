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
  watch: UseFormWatch<T>;
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
  dataFilters?: string | number | string[];
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

export interface LabelValue {
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
  desde: string;
  hasta: string;
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
  ubicacion: Ubicacion | string;
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

export interface FormInputsAnulaciones {
  monto: number;
  motivo: null | "";
}

interface Ubicacion {
  latitud: number;
  longitud: number;
}

export interface ColApiProyecto {
  id: number;
  nombre: string;
  fecha: string; // Formato ISO 8601, podría ser Date si lo prefieres
  ubicacion: Ubicacion;
  cantidad: number;
  observacion: string;
  tipo_participante: string[];
  fk_categoria_proyecto_id: number;
  observaciones: string | null;
  active: number;
  fecha_creacion: string; // Formato ISO 8601, podría ser Date si lo prefieres
  fecha_actualizacion: string; // Formato ISO 8601, podría ser Date si lo prefieres
}

export interface ColApiEgreso {
  id: number;
  nombre_actividad: string;
  fecha_actividad: string;
  cantidad: number;
  id_registro_afiliado: number;
  no_transaccion: string;
  observaciones: string;
  fk_tipo_aportacion: number;
  fk_tipo_control: number;
}

export interface Proyecto {
  id?: number;
  nombre?: string;
  fecha?: string;
  ubicacion?: {
    latitud?: number;
    longitud?: number;
  };
  cantidad?: number;
  observacion?: string;
  tipo_participante?: string[];
  fk_categoria_proyecto_id?: number;
  observaciones?: string | null;
  active?: number;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface Bitacora {
  id?: number;
  fecha?: string;
  nombre_persona?: string;
  fk_proyecto_id?: number;
  fk_tipo_aporte_id?: number;
  cantidad?: string;
  observaciones?: string | null;
  active?: number;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface Egreso {
  id?: number;
  nombre_actividad?: string;
  fecha_actividad?: string;
  cantidad?: string;
  id_registro_afiliado?: number;
  no_transaccion?: string;
  observaciones?: string;
  fk_tipo_aportacion?: number;
  fk_tipo_control?: number;
  fk_tipo_afiliado?: number;
}
export interface ColApiAporte {
  id: number;
  fecha: string;
  nombre_persona: string;
  fk_proyecto_id: number;
  fk_tipo_aporte_id: number;
  cantidad: string;
  observaciones: string | null;
  active: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export type columnType = ColApiProyecto | ColApiAporte | ColApiEgreso;

export interface FormInputLogin {
  usuario: string;
  password: string;
}

export interface FormCrearUser {
  nombre: string;
  usuario: string;
  password: string;
}
