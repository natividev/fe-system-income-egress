export type Option = { label: string; value: number | string };

export interface FormInputsProducto {
  nombre: string;
  descripcion?: string;
  codigo_barra?: string;
  precio_unitario: number;
  stock_actual?: number;
  activo?: boolean;
  id_categoria: Option | null;
  id_unidad_medida: Option | null;
}

export interface ResultApiProducto {
  id: number;
  // ...otros campos que responda tu API
}

export interface FormInputsMovimiento {
  tipo: Option | null;        // value: 'entrada' | 'salida' | 'ajuste'
  cantidad: number;
  referencia?: string;
  observacion?: string;
  id: Option | null;
  id_usuario: number;         
}

export interface ResultApiMovimiento {
  id_movimiento: number;
  // ...otros campos que responda tu API
}
