"use client";

import { useDispatch, useSelector } from "react-redux";
import { FormBitacora } from "../FormBitacora/FormBitacora";
import { RootState } from "@/store/store";
import { useState } from "react";
import { FormInputsBitacora } from "@/interface/interfaces";
import axiosInstance from "@/api/axiosInstance";
import { resetState } from "@/features/bitacora/bitacora";

export const BitacoraCrearView = () => {
  const defaultState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [isLoadig, setIsLoading] = useState<boolean>(false);

  const buildPayload = (data: FormInputsBitacora) => {
    const payload = {
      fecha: data.fecha,
      nombrePersona: data.nombrePersona,
      proyectoId: data.proyectoId?.value,
      tipoAporteId: data.tipoAporteId?.value,
      cantidad: data.cantidad,
      observaciones: data.observaciones,
    };

    return payload;
  };

  const onSubmit = async (data: FormInputsBitacora) => {
    setIsLoading(true);
    try {
      const payload = buildPayload(data);

      if (defaultState?.stateBitacora?.id) {
        const { id } = defaultState?.stateBitacora;
        const endpoint = `/bitacora-aportacion?id=${id}`;
        const { data: result } = await axiosInstance.patch(endpoint, payload);
        dispatch(resetState({}));
        return result;
      }

      const { data: result } = await axiosInstance.post(
        "/bitacora-aportacion",
        payload
      );
      return result;
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormBitacora
      defaultState={defaultState}
      isLoadig={isLoadig}
      onSubmit={onSubmit}
      title={
        defaultState?.stateBitacora?.id
          ? "ACTUALIZAR BITACORA DE APORTACIONES A PROYECTO"
          : "CREAR BITACORA DE APORTACIONES A PROYECTO"
      }
    />
  );
};
