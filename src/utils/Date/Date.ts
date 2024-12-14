export const obtenerFechaFormateada = (fecha: Date = new Date()) => 
    fecha.toISOString().split("T")[0];
  
  export const obtenerFinDeMes = (fecha: Date = new Date()) => {
    const finDeMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    return obtenerFechaFormateada(finDeMes);
  };
  
  export const fechaActualFormat = obtenerFechaFormateada();
  export const finDeMesFormat = obtenerFinDeMes();