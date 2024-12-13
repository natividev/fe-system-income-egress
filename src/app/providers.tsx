"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./theme";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
    </Provider>
  );
}
