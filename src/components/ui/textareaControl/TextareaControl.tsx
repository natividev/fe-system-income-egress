import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { InputControllerProps } from "@/interface/interfaces";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";

export const TextAreaController = <T extends FieldValues>({
  children,
  label,
  name,
  control,
  watch,
  rules,
  placeholder,
  disabledInput = false,
}: InputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ fieldState, field: { onBlur, onChange } }) => (
        <FormControl isInvalid={!!fieldState.error}>
          <FormLabel
            color={fieldState.error ? "red" : "#000"}
            htmlFor={name as string}
          >
            {label}
          </FormLabel>
          <InputGroup>
            <Textarea
              autoComplete="off"
              id={name as string}
              disabled={disabledInput}
              placeholder={placeholder}
              value={watch(name)}
              onChange={onChange}
              onBlur={onBlur}
            />
            {children}
          </InputGroup>
          {fieldState.error && (
            <FormErrorMessage>{fieldState.error.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
