"use client";
import React, { useEffect, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { SelectControllerProps } from "@/interface/interfaces";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
} from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import axiosInstance from "@/api/axiosInstance";

interface resultItems {
  id: number;
  nombre: string;
}

export const SelectController = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
  placeholder,
  disabledInput = false,
  endpoint,
}: SelectControllerProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    const { data } = await axiosInstance.get(endpoint);

    if (data) {
      setOptions(
        data.map((element: resultItems) => ({
          label: element.nombre,
          value: element.id,
        }))
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []); //eslint-disable-line

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl isInvalid={!!fieldState.error}>
          <FormLabel
            color={fieldState.error ? "red.500" : "gray.800"}
            htmlFor={name as string}
          >
            {label}
          </FormLabel>
          <InputGroup zIndex={"1000"} width="100%">
            <AsyncSelect
              {...field}
              id={name as string}
              isDisabled={disabledInput}
              placeholder={placeholder}
              defaultOptions={options}
              isLoading={isLoading}
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                  zIndex: "1000",
                }),
              }}
            />
          </InputGroup>
          {fieldState.error && (
            <FormErrorMessage>{fieldState.error.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
