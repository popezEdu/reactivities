import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./app/layout/styles.css";

import "react-toastify/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { router } from "./app/router/Routes.tsx";
import { store, StoreContext } from "./lib/stores/store.ts";

import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools></ReactQueryDevtools>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        {/* Importante ¿Por qué aqui no aparece el componente
          Esto se debe justamente a que ya usamos rutas.
          Si es que no hubiera el RouterProvider aquí
          Si se debería escribir el componente que se debería mostrar. */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StoreContext.Provider>
  </StrictMode>
);
