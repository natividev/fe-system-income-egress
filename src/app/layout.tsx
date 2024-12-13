"use client";
import { Providers } from "./providers";
import SidebarWithHeader from "@/components/ui/Sidebar/Sidebar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Provider store={store}>
          <Providers>
            <SidebarWithHeader>{children}</SidebarWithHeader>
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
