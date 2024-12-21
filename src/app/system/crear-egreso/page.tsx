"use client";
import axiosInstance from "@/api/axiosInstance";
import { resetStateEgrego } from "@/features/egreso/egreso";
import { FormInputs } from "@/interface/interfaces";
import { RootState } from "@/store/store";
import RegisterFormControl from "@/view/RegisterFormControl/RegisterFormControl";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EgresoPage() {
  const defaultState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputs) => {
    const payload = {
      nombreActividad: data.actividadEconomica,
      fechaActividad: data.fechaActividad,
      cantidad: data.cantidad,
      fkTipoAfiliado: data.tipoAfiliado?.value,
      idAfiliado: data.afiliado?.value,
      noTransaccion: data.transaccion,
      observaciones: data.observaciones,
      fkTipoControl: data.tipoControl?.value,
      fkTipoAportacion: data.tipoAportacion?.value,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);

      if (defaultState.stateEgreso.id) {
        const { id } = defaultState.stateEgreso;
        const endpoint = `/egreso?id=${id}`;
        const { data: result } = await axiosInstance.patch(endpoint, payload);
        dispatch(resetStateEgrego({}));
        return result;
      }
      const { data: result } = await axiosInstance.post("/egreso", payload);
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterFormControl
      defaultState={defaultState}
      onSubmit={onSubmit}
      isLoadig={isLoadig}
      title={
        defaultState?.stateEgreso?.id ? "ACTUALIZAR EGRESO" : "CREAR EGRESO"
      }
      isIngreso={false}
    />
  );
}
