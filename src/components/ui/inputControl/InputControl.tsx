import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { InputControllerProps } from "@/interface/interfaces";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
} from "@chakra-ui/react";

export const InputController = <T extends FieldValues>({
  children,
  label,
  name,
  control,
  type = "text",
  rules,
  placeholder,
  disabledInput = false,
}: InputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ fieldState, field: { onBlur, value, onChange } }) => (
        <FormControl isInvalid={!!fieldState.error}>
          <FormLabel
            color={fieldState.error ? "red" : "#000"}
            htmlFor={name as string}
            zIndex={500}
          >
            {label}
          </FormLabel>
          <InputGroup>
            <Input
              autoComplete="off"
              type={type}
              id={name as string}
              disabled={disabledInput}
              placeholder={placeholder}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
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
