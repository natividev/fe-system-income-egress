"use client";

import { FormInputs } from "@/interface/interfaces";
import axiosInstance from "@/api/axiosInstance";
import RegisterFormControl from "@/view/RegisterFormControl/RegisterFormControl";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { resetStateEgrego } from "@/features/egreso/egreso";

export default function IngresoPage() {
  const defaultState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputs) => {
    const payload = {
      nombreActividad: data.actividadEconomica,
      fechaActividad: data.fechaActividad,
      cantidad: data.cantidad,
      idAfiliado: data.afiliado?.value,
      noTransaccion: data.transaccion,
      observaciones: data.observaciones,
      fkTipoIngreso: data.tipoIngreso?.value,
      fkTipoControl: data.tipoControl?.value,
      fkTipoAportacion: data.tipoAportacion?.value,
      fkTipoAfiliado: data.tipoAfiliado?.value,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);

      if (defaultState.stateEgreso.id) {
        const { id } = defaultState.stateEgreso;
        const endpoint = `/ingreso?id=${id}`;
        const { data: result } = await axiosInstance.patch(endpoint, payload);
        dispatch(resetStateEgrego({}));
        return result;
      }

      const { data: result } = await axiosInstance.post("/ingreso", payload);
      return result;
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterFormControl
      onSubmit={onSubmit}
      isLoadig={isLoadig}
      title={
        defaultState?.stateEgreso?.id ? "ACTUALIZAR INGRESO" : "CREAR INGRESO"
      }
      isIngreso={true}
      defaultState={defaultState}
    />
  );
}
