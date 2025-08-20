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
  id_producto: number;
  // ...otros campos que responda tu API
}

export interface FormInputsMovimiento {
  tipo: Option | null;        // value: 'entrada' | 'salida' | 'ajuste'
  cantidad: number;
  referencia?: string;
  observacion?: string;
  id_producto: Option | null; // value: id_producto
  id_usuario: number;         // o derivado de auth
}

export interface ResultApiMovimiento {
  id_movimiento: number;
  // ...otros campos que responda tu API
}
