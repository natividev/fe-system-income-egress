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

interface items {
  id: number;
  descripcion?: string;
  nombre?: string;
  razon_social?: string;
}

export const SelectController = <T extends FieldValues>({
  label,
  name,
  setValue,
  watch,
  control,
  rules,
  placeholder,
  isDefaultValue = true,
  disabledInput = false,
  endpoint,
}: SelectControllerProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(endpoint);

      if (data) {
        const option = data.map((element: items) => {
          return {
            label:
              element?.nombre || element?.descripcion || element?.razon_social,
            value: element.id,
          };
        });
        if (isDefaultValue) setValue(name, option[0]);
        setOptions(option);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [endpoint]); //eslint-disable-line

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
              value={watch(name)}
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
